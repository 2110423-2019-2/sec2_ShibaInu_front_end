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
        return localStorage.getItem('access_token') || '';
    }
    function _clearToken() {
        localStorage.removeItem('access_token');
    }

    function _setUserID(userID) {
        localStorage.setItem('userID', userID);
    }
    function _getUserID() {
        return localStorage.getItem('userID') || '';
    }
    function _clearUserID() {
        localStorage.removeItem('userID');
    }

    function _signOut() {
        _clearToken();
        _clearUserID();
    }
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        clearToken: _clearToken,
        setUserID: _setUserID,
        getUserID: _getUserID,
        clearUserID: _clearUserID,
        signOut: _signOut
    }
})();
export default LocalStorageService;