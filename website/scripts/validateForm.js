// True if user did not enter any GitHub usernames on the Home Page
function emptyForm(){
    let usernames = document.getElementsByClassName('username');
    if (usernames){
        let inputExists = false;
        for (let user of usernames){
            if (user.value != ''){
                inputExists = true;
            }
        }
        
        return !inputExists;

    } else{
        // There's no 'username' class in the HTML! :-(
        return true;
    }
}

function validateForm(){
    if(emptyForm()){
        document.getElementById('error-message').innerHTML = '<p>Please enter at least one GitHub username</p>';
    }

    // perform the other checks here

    // if all checks pass, we go to the profiles page

}


// ===== MAIN =====