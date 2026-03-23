window.onload = function() {
    let user = localStorage.getItem("user");

    // Sidebar me naam
    if(document.getElementById("userInfo")) {
        document.getElementById("userInfo").innerText = "👤 " + user;
    }

    // Center me welcome message
    if(document.getElementById("welcomeText")) {
        document.getElementById("welcomeText").innerText = "Welcome " + user + " 👋";
    
    
    }


}