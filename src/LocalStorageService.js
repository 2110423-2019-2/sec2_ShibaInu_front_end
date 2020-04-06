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

    function _setChatroom(chatroom) {
        localStorage.setItem('chatroom', chatroom);
    }
    function _getChatroom() {
        return localStorage.getItem('chatroom') || '';
    }
    function _clearChatroom() {
        localStorage.removeItem('chatroom');
    }

    function _setChatWithName(chatWithName) {
        localStorage.setItem('chatWithName', chatWithName);
    }
    function _getChatWithName() {
        return localStorage.getItem('chatWithName') || '';
    }
    function _clearChatWithName() {
        localStorage.removeItem('chatWithName');
    }

    function _setChatWithId(chatWithId) {
        localStorage.setItem('chatWithId', chatWithId);
    }
    function _getChatWithId() {
        return localStorage.getItem('chatWithId') || '';
    }
    function _clearChatWithId() {
        localStorage.removeItem('chatWithId');
    }

    function _signOut() {
        _clearToken();
        _clearUserID();
        _clearUserMode();
        _clearChatroom();
        _clearChatWithName();
        _clearChatWithId();
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
        setChatroom: _setChatroom,
        getChatroom: _getChatroom,
        clearChatroom: _clearChatroom,
        setChatWithName: _setChatWithName,
        getChatWithName: _getChatWithName,
        clearChatWithName: _clearChatWithName,
        setChatWithId: _setChatWithId,
        getChatWithId: _getChatWithId,
        clearChatWithId: _clearChatWithId,
        signOut: _signOut
    }
})();
export default LocalStorageService;