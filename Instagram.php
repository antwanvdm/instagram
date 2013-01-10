<?php
/**
 * @class Instagram
 * Class to connect with Instagram & retrieve data
 */
class Instagram
{
    private $endpointAuthorize = "https://api.instagram.com/oauth/authorize/";
    private $endpointAccessToken = "https://api.instagram.com/oauth/access_token";
    private $endpointApi = 'https://api.instagram.com/v1/';

    private $clientId = "";
    private $clientSecret = "";
    private $redirectUrl = "";
    private $responseType = "code";
    private $grantType = "authorization_code";

    /**
     * @var array Used to get/set data
     */
    private $data = array();

    /**
     * Initialize object with desired client settings
     *
     * @param $clientId
     * @param $clientSecret
     * @param $redirectUrl
     */
    public function __construct($clientId, $clientSecret, $redirectUrl)
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->redirectUrl = $redirectUrl;
    }

    /**
     * Setter for variables
     *
     * @param $name
     * @param $value
     * @see $data
     */
    public function __set($name, $value){
        $this->data[$name] = $value;
    }

    /**
     * Getter for variables
     *
     * @param $name
     * @return mixed
     * @see $data
     */
    public function __get($name){
        if (array_key_exists($name, $this->data)) {
            return $this->data[$name];
        }

        $trace = debug_backtrace();
        trigger_error('Undefined property via __get(): ' . $name . ' in ' . $trace[0]['file'] . ' on line ' . $trace[0]['line'], E_USER_NOTICE);
        return null;
    }

    /**
     * Redirect user to the authorize url
     */
    public function authorize()
    {
        $apiUrl = $this->endpointAuthorize;
        $apiUrl .= "?client_id=" . $this->clientId;
        $apiUrl .= "&redirect_uri=" . $this->redirectUrl;
        $apiUrl .= "&response_type=" . $this->responseType;
        header("Location: $apiUrl");
        exit;
    }

    /**
     * Retrieve a valid accessToken by the given code, which was retrieved by the authorize() callback
     *
     * @param $code
     * @return bool|string
     */
    public function retrieveAccessToken($code)
    {
        $parameters = array(
            "client_id" => $this->clientId,
            "client_secret" => $this->clientSecret,
            "grant_type" => $this->grantType,
            "redirect_uri" => $this->redirectUrl,
            "code" => $code,
        );

        $result = $this->curlAccessToken($this->endpointAccessToken, $parameters);

        //Return the accessToken on success, else return false.
        if (isset($result["access_token"])) {
            $this->user = $result["user"];
            $this->accessToken = $result["access_token"];

            return $this->accessToken;
        }

        return false;
    }

    /**
     * Call the accessToken endpoint to retrieve a accessToken
     *
     * @param $endPoint
     * @param $parameters
     * @return mixed
     * @see retrieveAccessToken()
     */
    private function curlAccessToken($endPoint, $parameters)
    {
        $curl = curl_init($endPoint);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $parameters);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($curl);
        curl_close($curl);

        return json_decode($result, true);
    }

    private function apiCall($method, $params)
    {
        $queryString = "?" . http_build_query(array_merge(array("access_token" => $this->accessToken), $params));
        $data = file_get_contents($this->endpointApi . $method . $queryString);

        return json_decode($data, true);
    }

    public function search($tag)
    {
//        $data = $this->apiCall("tags/search", array(
//            "q" => $tag
//        ));
        $data = $this->apiCall("tags/" . $tag . "/media/recent", array(
            "min_id" => $tag
        ));
        print_r($data);
    }
}
