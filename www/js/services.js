angular.module('app')
.factory('ApiService', function($q, $http) {

  API_URL = 'https://my-json-server.typicode.com/jhonifreitas/youper-challenge-v1/';

  firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);

  userCollection = firestore.collection("users");
  msgCollection = firestore.collection("messages");

  // USER
  function getUser(id, callback){
    return $q(function(resolve, reject) {
      userCollection.doc(id).onSnapshot(function(doc) {
        resolve({ id: doc.id, ...doc.data() });
      }, function(err){
        reject(err);
      })
    })
  }

  function putUser(id, user){
    delete user.id;
    userCollection.doc(id).update(user);
  }

  // MESSAGES
  function getMessages(user_id){
    return $http.get(API_URL+'messages')
    .then(function(response) {
      return response.data;
    }, function(response){
      return response;
    })
  }

  function putMessage(id, message){
    return $http.put(API_URL+'messages', message)
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