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

    function _setUserMode(mode) {
        localStorage.setItem('userMode', mode);
    }
    function _getUserMode() {
        return localStorage.getItem('userMode') || '';
    }
    function _clearUserMode() {
        localStorage.removeItem('userMode');
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
        setUserMode: _setUserMode,
        getUserMode: _getUserMode,
        clearUserMode: _clearUserMode,
        signOut: _signOut
    }
})();
export default LocalStorageService;