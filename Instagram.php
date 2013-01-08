<?php
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

	private $user = null;
	private $accessToken = "";

	public function __construct($clientId, $clientSecret, $redirectUrl)
	{
		$this->clientId = $clientId;
		$this->clientSecret = $clientSecret;
		$this->redirectUrl = $redirectUrl;
	}

	public function authorize()
	{
		$apiUrl = $this->endpointAuthorize;
		$apiUrl .= "?client_id=" . $this->clientId;
		$apiUrl .= "&redirect_uri=" . $this->redirectUrl;
		$apiUrl .= "&response_type=" . $this->responseType;
		header("Location: $apiUrl");
		exit;
	}

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
		print_r($result);

		if (isset($result["access_token"])){
			$this->saveUser($result["user"]);
			$this->saveAccessToken($result["access_token"]);
			return $this->accessToken;
		}

		return false;
	}

	private function curlAccessToken($endPoint, $parameters){
		$curl = curl_init($endPoint);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $parameters);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

		$result = curl_exec($curl);
		curl_close($curl);
		return json_decode($result, true);
	}

	public function saveUser($user){
		$this->user = $user;
	}

	public function saveAccessToken($accessToken){
		$this->accessToken = $accessToken;
	}

	public function getAccessToken(){
		return $this->accessToken;
	}

	private function apiCall($method, $params){
		$queryString = "?" . http_build_query(array_merge(array("access_token" => $this->accessToken), $params));
		$data = file_get_contents($this->endpointApi . $method . $queryString);
		return json_decode($data, true);
	}

	public function search($tag){
		$data = $this->apiCall("tags/search", array(
			"q" => $tag
		));
		print_r($data);
	}
}
