import Vue from 'vue'
import { QSpinnerGears, Notify, LocalStorage, Loading, date } from 'quasar'
import {firebaseAuth, dbUsers, imagesUsers} from "../../boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import { showLoading } from "../../functions/show-loading";

const { addToDate } = date





const state = {
    userAuth: null,
    redirectTo: '/admin',
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
    getUserImage : (state) => (user) => {
        if (!user) {
            return 'statics/icons/icon-128x128.png'
        }
        return user && user.image ? user.image : state.defaultUser
    },
    getUserName : (state) => (user) => {
        if (!user) {
            return 'Carta Fácil'
        }
        return user && user.name ? user.name : 'Miguel Matos'
    },
    getUserLocation : (state, getters) => (user) => {
        if (!user) {
            return ''
        }
        return getters.isUserPro(user) ? 'Utilizador PRO' : 'Conta gratuíta'
    },
    getUserAuth : (state) => {
        return state.userAuth && state.users ? state.users[state.userAuth.id] : null
    },
    isUserPro : (state) => (user) => {
        if (user && user.payments && user.payments.length) {

            let lastPayment = user.payments[user.payments.length -1]

            let todayFormated = date.formatDate(new Date(), 'YYYY-MM-DD')

            return todayFormated <= lastPayment.endAt

        }
        return false
    },
    dynamicColor : (state, getters) => {
        return getters.isUserPro(state.userAuth) ? 'green-8' : 'primary'
    },
    dynamicExadecimalColor : (state, getters) => {
        return getters.isUserPro(state.userAuth) ? '#388e3c' : '#027BE3'
    },
}

const actions = {

    registerUser ({ commit, state, dispatch }, payload) {
        Loading.show()
        return firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(resp => {

                let user = payload
                user.id = resp.user.uid
                user.email = resp.user.email
                user.createdAt = new Date()
                user.updatedAt = new Date()

                 commit('setUserAuth', user)
                 dispatch('addUser', user)
                showSuccessMessage('A sua conta foi criada com sucesso!')
                this.$router.push(state.redirectTo)

                Loading.hide()
                return user
            })
            .catch(error => {
                showErrorMessage(error.message)
                return null
            })
    },

    loginUser ({ commit, state }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(resp => {
                // commit('setUserAuth', {
                //     id: resp.user.uid,
                //     email: resp.user.email,
                // })

                showSuccessMessage('Sessão iniciada com sucesso!')
                this.$router.push(state.redirectTo)

                Loading.hide()
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },

    handleAuthStateChange ({ commit }) {

        commit('setUserAuth', {id: LocalStorage.getItem('userAuthId')})

        firebaseAuth.onAuthStateChanged(user => {
            if (user) {

                commit('setUserAuth', {
                    id: user.uid,
                    email: user.email,
                })

            } else {
                commit('setUserAuth', null)
            }
        })
    },

    logoutUser ({ commit }) {
        firebaseAuth.signOut();
        showSuccessMessage('Sessão terminada com sucesso!')
        commit('setUserAuth', null)
        this.$router.push('/login')
    },

    addUser ({commit}, payload) {        

        dbUsers.doc(payload.id).set(payload)
            .then(function(docRef) {
                // gravado com sucesso...
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updateUser ({commit}, payload) {
        payload.updatedAt = new Date()
        commit('loading', true)
        return dbUsers.doc(payload.id).update(payload.updates)
            .then(function(docRef) {      
                commit('loading', false)
                let message = payload.successMessage ? payload.successMessage : 'Dados actualizados com sucesso!'
                showSuccessMessage(message)
                return message
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
                return null
            });
    },

    deleteUser ({commit}, id) {
        commit('loading', true)
        dbUsers.doc(id).delete()
            .then(function(docRef) {
                commit('loading', false)
                // showSuccessMessage('Serviço deletado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });



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

    findUserByUserNameAndTelefone ({state, commit, dispatch}, payload) {

        commit('loading', true)

        dispatch('findUserByTelefone', payload)
            .then((user) => {

                if (user) {
                    dispatch('loginUser', {
                        telefone: user.email,
                        password: payload.password
                    })
                } else {
                    Notify.create({
                        message: 'Não existe nenhum utilizador registado com este número de telefone!',
                        color: 'negative'
                    })
                }
                commit('loading', false)
            })
            .catch((error) => {
                commit('loading', false)
                console.log(error.message)
                showErrorMessage(error.message)
            })

    },

    findUserByTelefone ({state, commit, dispatch}, payload) {

        const queryTelefone = dbUsers.where("telefone", "==", payload.telefone).get()

        return queryTelefone.then(function(snapshot) {

            let foundElements = snapshot.docChanges()

            if (foundElements.length === 1) {

                let foundUser = foundElements[0].doc.data()

                foundUser.id = foundElements[0].doc.id
                foundUser.password = payload.password

                return foundUser

            } else {

                return null
            }

        });
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

    // =======================================================

    // ============ ePayment API comunication

    // =======================================================

   
    
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