firebase.initializeApp({
    databaseURL: "https://mycomplex-c3986-default-rtdb.firebaseio.com/"
});

$('#get').on('click', function() {
    var room1 = $('#room').val();

    console.log("room", room1);


    var dbRef = firebase.database().ref().child("contacts");

    dbRef.orderByChild("room").equalTo(room1).on("child_added", snap => {
        var name = snap.child("name").val();
        var phone = snap.child("floor").val();
        var meet = snap.child("mob").val();
        var email = snap.child("email").val();
        var skey = snap.child("skey").val();

        console.log("snap,skey", name, skey)
        k = email;
        console.log("k", k);
        $('.popup').append('<tr><td>' + name + '<td><td>' + phone + '</td><td>' + meet + '</td><td>' + email + '</td></tr>')


        // Email.send({
        //     Host: "smtp.yourisp.com",
        //     Username: "subudhisubhraprakash20@gmail.com",
        //     Password: "",
        //     To: k,
        //     From: "subudhisubhraprakash20@gmail.com",
        //     Subject: "My complex Alret",
        //     Body: "And this is the body"
        // }).then(
        //     message => alert(message)
        // );
        var room = $('#room').val();
        var phone = $('#phone').val();
        var meet = $('#meet').val();
        console.log("phone,mee,roomt", phone, meet, room);

        var contactsRef = firebase.database().ref('contacts/' + skey);

        event.preventDefault();
        if ($('#room').val != ' ' || $('#phone').val() != '') {
            // var postkey = firebase.database().ref().child('contacts/' + skey).push().key;
            // console.log("Postkey", postkey);
            contactsRef.push({
                phone: $('#phone').val().replace(),
                meet: $('#meet').val().replace()
            })

        }


    })

})
$('#get').on('click', function() {
    $('.popup').toggle();
})

$('delete').on("click", function() {
    console.log("Inside deelte")
})







//WebCam
var videoCapture;
$(document).ready(function() {
    videoCapture = document.getElementById('capturevideo');
});
$(document).on('click', '#btnActivateCamera', function() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // access video stream from webcam
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function(stream) {
            // on success, stream it in video tag 
            window.localStream = stream;
            videoCapture.srcObject = stream;
            videoCapture.play();
            activateCamera();
            console.log("videocapture", videoCapture);
        }).catch(e => {
            // on failure/error, alert message. 
            alert("Please Allow: Use Your Camera!");
        });
    }
});
$(document).on('click', '#btnDeactivateCamera', function() {
    // stop video streaming if any
    localStream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
            deactivateCamera();
        }
    });
});
$(document).on('click', '#btnCapture', function() {
    document.getElementById('capturecanvas').getContext('2d').drawImage(videoCapture, 0, 0, 230, 230);
});

function activateCamera() {
    $("#btnActivateCamera").addClass("d-none");
    $("#btnDeactivateCamera").removeClass("d-none");
    $("#capturevideo").removeClass("d-none");
    $("#btnCapture").removeClass("d-none");
    $("#capturecanvas").removeClass("d-none");
}

function deactivateCamera() {
    $("#btnDeactivateCamera").addClass("d-none");
    $("#btnActivateCamera").removeClass("d-none");
    $("#capturevideo").addClass("d-none");
    $("#btnCapture").addClass("d-none");
    $("#capturecanvas").addClass("d-none");
}