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
	public function __set($name, $value)
	{
		$this->data[$name] = $value;
	}

	/**
	 * Getter for variables
	 *
	 * @param $name
	 * @return mixed
	 * @see $data
	 */
	public function __get($name)
	{
		if (array_key_exists($name, $this->data)) {
			return $this->data[$name];
		}

		$trace = debug_backtrace();
		trigger_error('Undefined property via __get(): ' . $name . ' in ' . $trace[0]['file'] . ' on line ' . $trace[0]['line'], E_USER_NOTICE);
		return null;
	}

	/**
	 * Implemented to redirect functions to apiCall
	 *
	 * @param $name
	 * @param $arguments
	 * @return mixed
	 * @throws InstagramApiMethodCallException
	 */
	public function __call($name, $arguments)
	{
		$apiMethods = $this->apiMethods();

		if (array_key_exists($name, $apiMethods)) {
			$method = is_array($arguments[0]) ? $apiMethods[$name] : str_replace("@replace", $arguments[0], $apiMethods[$name]);
			$params = array();

			if (is_array($arguments[0])) {
				$params = $arguments[0];
			} elseif (isset($arguments[1])) {
				$params = $arguments[1];
			}

			return $this->apiCall($method, $params);
		} else {
			throw new InstagramApiMethodCallException("Instagram API Method is not implemented as a function in the Instagram Class");
		}
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
		exit();
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

	/**
	 * Wrapper function for actual api calls
	 *
	 * @param $method
	 * @param array $params
	 * @return mixed
	 */
	private function apiCall($method, $params = array())
	{
		$queryString = "?" . http_build_query(array_merge(array("access_token" => $this->accessToken), $params));
		try {
			$data = file_get_contents($this->endpointApi . $method . $queryString);
			return json_decode($data, true);
		} catch (HttpRequestException $e) {
			return array();
		}
	}

	/**
	 * Mapping of callable functions and the Instagram API methods
	 *
	 * @return array
	 * @link http://instagram.com/developer/endpoints/
	 */
	private function apiMethods()
	{
		return array(
			"apiUsers" => "users/@replace",
			"apiUsersSelfFeed" => "users/self/feed",
			"apiUsersMediaRecent" => "users/@replace/media/recent",
			"apiUsersSelfMediaLiked" => "users/self/media/liked",
			"apiUsersSearch" => "users/search",
			"apiUsersFollows" => "users/@replace/follows",
			"apiUsersFollowedby" => "users/@replace/followed-by",
			"apiUsersSelfRequestedby" => "users/self/requested-by",
			"apiUsersRelationship" => "users/@replace/relationship", //TODO GET & POST
			"apiMedia" => "media/@replace",
			"apiMediaSearch" => "media/search",
			"apiMediaPopular" => "media/popular",
			"apiMediaComments" => "media/@replace/comments", //TODO GET & POST & DELETE & 2 @replace tags
			"apiMediaLikes" => "media/@replace/likes", //TODO GET & POST & DELETE
			"apiTags" => "tags/@replace",
			"apiTagsMediaRecent" => "tags/@replace/media/recent",
			"apiTagsSearch" => "tags/search",
			"apiLocations" => "locations/@replace",
			"apiLocationsSearch" => "locations/search",
			"apiGeographiesMediaRecent" => "geographies/@replace/media/recent"
		);
	}
}