import Vue from 'vue'
import { QSpinnerGears, Notify, LocalStorage, Loading, date } from 'quasar'
import {firebaseAuth, dbUsers, imagesUsers} from "../../boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import { showLoading } from "../../functions/show-loading";
import { Platform } from 'quasar'

const { addToDate } = date

const state = {
    userAuth: null,
    defaultUser: '/statics/users/default-user.png',
    users: {},
    loading: false,
    uploadProgress: -1,
    userToLogin: null,
}

const mutations = {

    setUserAuth (state, val) {
        state.userAuth = val
        if (val && val.id) {
            LocalStorage.set('userAuthId', val.id)

            if (Object.keys(state.users).length && state.users[val.id]) {
                state.userAuth = state.users[val.id]
                LocalStorage.set('userAuth', state.users[val.id])

            }

        } else {
            LocalStorage.set('userAuthId', null)
        }
    },
    setUserToLogin (state, val) {
        state.userToLogin = val
    },

    loading (state, val) {
        state.loading = val
    },

    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    addUser (state, payload) {
        console.log('chegou')
        Vue.set(state.users, payload.id, payload.object)
    },
    
    updateUser (state, payload) {
        Object.assign(state.users[payload.id], payload.updates)
    },
    deleteUser (state, id) {
        Vue.delete(state.users, id)
    },

}

const getters = {
    getUser  : (state) =>  {
        
        return  state.userAuth 
    },
    getUserName : (state) => (user) => {
        if (!user) {
            return 'Anonimo'
        }
        return user && user.name ? user.name : 'Anonimo'    },
    getUserLocation : (state, getters) => (user) => {
        if (!user) {
            return ''
        }
        return getters.isUserPro(user) ? 'Utilizador PRO' : 'Conta gratuíta'
    },
    getUserAuth : () => {
      let userAuth = LocalStorage.getItem('userAuth')
     return userAuth

    },
    
}

const actions = {

    registerUser ({ commit, state, dispatch }, payload) {
        Loading.show();
        let userId = ''
        let user = payload;
         firebaseAuth
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((resp) => {
                // delete payload.password

              
                user.id = resp.user.uid;
                user.email = resp.user.email;
                user.name = payload.name;
                
 
                // commit('setUserAuth', user);
                dispatch('addUser', user)

                
                
                Loading.hide();

                return user;
            })
            .catch((error) => {
                showErrorMessage(error.message);
                return null;
            });

           

    },

    loginUser ({ commit, dispatch }, payload) {
        Loading.show()
            dispatch('')
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(resp => {
                commit('setUserAuth', {
                    id: resp.user.uid,
                    email: resp.user.email,
                })





                if(Platform.is.desktop) {
                    this.$router.push('/choice')

                }
                
                else if (Platform.is.mobile) {
                    this.$router.push('/sales')
                }

                

                Loading.hide()
            })
            .catch(error => {
                showErrorMessage('Usuario ou Senha Incorrectos  !')
            })
    },

    changeUser ({ commit } , payload) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                user.updatePassword('ssssssss').then(function() {
                        console.log('yes')
                  }).catch(function(error) {
                    // An error happened.
                  })

             //   user.updateEmail('fb@gmail.com').then(function() {
                //     // Update successful.
                //     console.log('yes Also')

                //   })
                

            } else {
              
            }
        })
    },

    deleteUserFromDb(){
        var user = firebaseAuth.currentUser;
        console.log(user)

    },

    
    logoutUser ({ commit }) {
        LocalStorage.remove('userAuth')
      
        firebaseAuth.signOut();
        showSuccessMessage('Sessão terminada com sucesso!')

        commit('setUserAuth', null)
      
        if(this.$router.push('/')) {
 this.$router.go()


 
        }

        
       
      
    },

    addUser({commit, getters}, payload) {

         return   dbUsers.doc(payload.id || 'xyz' ).set(payload)
            .then(function (docRef) {
                console.log("salvo")
            })
       
    },

    updateUser ({commit}, payload) {
        payload.updatedAt = new Date()
        commit('loading', true)
        return dbUsers.doc(payload.id).update(payload.updates)
            .then(function(docRef) {      
                commit('loading', false)
                showSuccessMessage('Dados actualizados com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
                return null
            });
    },

    deleteUser ({commit}, id) {
        // dbUsers.doc(id).delete()
        //     .then(function(docRef) {
        //         commit('loading', false)
        //         console.log('user deletado com sucesso!')
        //     })
        //     .catch(function(error) {
        //         console.error("Error removing document: ", error);
        //         commit('loading', false)
        //         showErrorMessage(error.message)
        //     });

    },

    listenUsersRealTimeChanges ({state, commit, dispatch}) {

        dbUsers.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                if (change.type === "added") {
                    commit('addUser', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })
                }

                if (change.type === "modified") {
                    commit('updateUser', {
                        id: change.doc.id,
                        updates: change.doc.data()
                    })
                }
                if (change.type === "removed") {

                    commit('deleteUser', change.doc.id)

                }
            });

            dispatch('updateAuthInfo')

        });
    },

    updateAuthInfo({ state, commit }) {
        if(state.userAuth && Object.keys(state.users).length) {

            commit('setUserAuth', state.users[state.userAuth.id])

        }
    },


   

    storeUserPhoto ({state, commit, dispatch}, saveObject) {

        showLoading({ //inicializando o processamento
            message: `Gravando  sua imagem ${ state.userAuth.name } <b>0%</b>, aguarde...`,
        })
        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        let uploadTask = imagesUsers.child('usersImages/' + imageName).put(saveObject.file);

        uploadTask.on('state_changed', function(snapshot){

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            showLoading({ //inicializando o processamento
                message: `Gravando sua imagem ${ state.userAuth.name } <b> + progress + '%</b>, aguarde...`,
            })
            commit('uploadProgress', progress)

        }, function(error) {
            // Handle unsuccessful uploads
            showLoading(null) //encerrando o processamento

        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
             uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                dispatch('updateUser', {
                    id: saveObject.id,
                    updates: {image: downloadURL},
                    successMessage: saveObject.successMessage
                })
                showLoading(null) //encerrando o processamento
            });
        });
    },

   
    
    showLoading ({}, isLoading) {
        const spinner = typeof QSpinnerGears !== 'undefined'
            ? QSpinnerGears
            : Quasar.components.QSpinnerGears

        if (isLoading) {
            Loading.show({
                spinner,
                spinnerColor: 'red',
                messageColor: 'black',
                backgroundColor: 'blue-2',
                message: 'Processando o seu pagamento,...'
            })
        } else {
            Loading.hide()
        }

    },


}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}