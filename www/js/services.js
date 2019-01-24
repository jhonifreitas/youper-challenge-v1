angular.module('app')
.factory('ApiService', function() {

  userCollection = firebase.firestore().collection("users");
  msgCollection = firebase.firestore().collection("messages");

  // USER
  function getUser(id){
    return userCollection.doc(id).get()
    .then(function(snapshot) {
      return {id: snapshot.id,...snapshot.data()};
    }, function(error) {
      return error
    })
  }

  function putUser(id, user){
    delete user.id;
    userCollection.doc(id).update(user);
  }

  // MESSAGES
  function getMessages(user_id){
    return msgCollection.where("user", "==", user_id).get()
    .then(function(snapshot) {
      list = []
      snapshot.forEach(function(doc) {
        list.push({ id: doc.id, ...doc.data() });
      });
      return list;
    }, function(error) {
      return error
    })
  }

  function putMessage(id, message){
    // delete message.id;
    delete message.$$hashKey;
    msgCollection.doc(id).update(message);
  }

  return {
    getUser: getUser,
    putUser: putUser,
    getMessages: getMessages,
    putMessage: putMessage
  };
})

.factory('StorageService', function() {

  function setUser(user){
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  function getUser(user){
    return JSON.parse(window.localStorage.getItem('user'));
  }

  return {
    setUser: setUser,
    getUser: getUser
  };
})

.factory('CameraService', function($cordovaCamera) {

  function takePicture(type){
    return $cordovaCamera.getPicture({
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then(function(imageBase64) {
      return 'data:image/jpeg;base64,'+imageBase64;
    });
  }

  return {
    takePicture: takePicture
  };
})