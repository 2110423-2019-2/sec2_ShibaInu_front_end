// LocalStorageService.js
const LocalStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(token) {
        localStorage.setItem('access_token', token);
    }
    function _getAccessToken() {
        return localStorage.getItem('access_token');
    }
    function _clearToken() {
        localStorage.removeItem('access_token');
    }
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        clearToken: _clearToken
    }
})();
export default LocalStorageService;