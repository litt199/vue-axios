const CONTACT_API = {
    //获取联系人
    getContactList:{
        method:'get',
        url:'/contactList'
    },
    //新建联系人form-data
    newContactList:{
        method:'post',
        url:'/contact/new/form'
    },
    //新建联系人 application/json
    newContactJson:{
        method:'post',
        url:'/contact/new/json'
    },
    //编辑联系人
    editContact:{
        method:'post',
        url:'/contact/edit'
    },
    //删除联系人
    delContact:{
        method:'post',
        url:'/contact'
    }
}
export default CONTACT_API