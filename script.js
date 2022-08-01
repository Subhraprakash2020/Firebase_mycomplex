var config = {
    apiKey: "AIzaSyB3EI1fYQEeWOzqyX9JQuPYbC4penRCpZo",
    authDomain: "mycomplex-c3986.firebaseapp.com",
    databaseURL: "https://mycomplex-c3986-default-rtdb.firebaseio.com",
    projectId: "mycomplex-c3986",
    storageBucket: "mycomplex-c3986.appspot.com",
    messagingSenderId: "892558324922",
    appId: "1:892558324922:web:cb8ad48b8f09babd2b3e83"

};
firebase.initializeApp(config);


//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
    // console.log("added", snap.key, snap.val());
    $('#contacts').append(contactHtmlFromObject(snap.val()));

});

contactsRef.on("child_added", function(snap) {
    $('.delete').on("click", function() {
        console.log("Inside delete");
        // var dleteid = $(this).dbRef.ref();

        // console.log("deleteid", dleteid)
        const btnDelete = $(this).attr('data-id')


        var node = firebase.database().ref('contacts/' + btnDelete);
        console.log("Key", node)
        var self = this;

        node.remove()
            .then(function() {
                console.log("Remove succeeded.")
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
        $(self).parent().remove();

    });

})
contactsRef.limitToFirst(1).on("child_added", function(snap) {
    $('.edit_data').on("click", function() {
        console.log("Inside edit");
        var btnDelete = $(this).attr('edit-id')
        console.log("btnDelete", btnDelete);
        $(".edit_model").show();
        $('#update').on('click', function() {
            data = {
                name: $('#ename').val().replace(),
                email: $('#eemail').val().replace(),
                mob: $('#emob').val().replace(),
                floor: $('#efloor').val().replace(),
                room: $('#eroom').val().replace(),
            }
            console.log("data", data);

            firebase.database().ref('contacts/' + btnDelete).update({
                email: data.email,
                floor: data.floor,
                mob: data.mob,
                name: data.name,
                room: data.room,
                skey: btnDelete
            });
        })
        $("#update").on('click', function() {
            console.log("inside hide");
            $(".edit_model").hide();
        })
    })

})

// Get a key for a new Post.




//save contact
$('.addValue').on("click", function(event) {
    event.preventDefault();
    if ($('#name').val() != '' || $('#email').val() != '') {
        var newPostKey = dbRef.ref().child('contacts').push().key;
        console.log(newPostKey);

        var data = {
            name: $('#name').val().replace(/<[^>]*>/ig, ""),
            email: $('#email').val().replace(/<[^>]*>/ig, ""),
            mob: $('#mob').val().replace(/<[^>]*>/ig, ""),
            floor: $('#floor').val().replace(/<[^>]*>/ig, ""),
            room: $('#room').val().replace(/<[^>]*>/ig, ""),
            skey: newPostKey

        }
        console.log("data", data);

        // contactsRef.push({
        //     name: $('#name').val().replace(/<[^>]*>/ig, ""),
        //     email: $('#email').val().replace(/<[^>]*>/ig, ""),
        //     mob: $('#mob').val().replace(/<[^>]*>/ig, ""),
        //     floor: $('#floor').val().replace(/<[^>]*>/ig, ""),
        //     room: $('#room').val().replace(/<[^>]*>/ig, ""),
        //     skey: newPostKey

        // })
        var updates = {};
        updates['contacts' + '/' + newPostKey] = data;
        console.log("Updates", updates);
        dbRef.ref().update(updates);
        contactForm.reset();
    } else {
        alert('Please fill atlease name or email!');
    }

});







// prepare conatct object's HTML
function contactHtmlFromObject(contact) {
    // console.log(contact);
    var html = '';
    html += '<li class="list-group-item contact">';
    html += '<div>';
    html += '<p class="lead">' + contact.name + '</p>';
    html += '<p>' + contact.email + '</p>';
    html += '<p>' + 'mob : ' + +contact.mob + '</p>';
    html += '<p>' + 'floor : ' + +contact.floor + '</p>';
    html += '<p>' + 'room : ' + +contact.room + '</p>';

    // html += '<p><small title="' + contact.location.zip + '">' + contact.location.city + ', ' + contact.location.state + '</small></p>';
    html += '</div>';
    html += '<button class="delete" data-id=' + contact.skey + '>';
    html += '<h4>Delete</h4>';
    html += '</button>';
    html += '<button class="edit_data" edit-id=' + contact.skey + '>';
    html += '<h4>Edit</h4>';
    html += '</button>';
    html += '</li>';
    return html;

}