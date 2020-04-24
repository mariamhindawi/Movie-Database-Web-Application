var express = require('express')
var app = express()
var path  = require('path')
var bodyParser = require('body-parser')
var fs = require('fs')
var session = require('express-session')
var ejs = require('ejs')

app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    'secret': 'Team 3102',
    'resave': false,
    'saveUninitialized': false
}))

var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('server is running')
})


let loadUsers = function() {
    try {
        let buffereddata = fs.readFileSync('users.json')
        let stringdata = buffereddata.toString()
        let usersArray = JSON.parse(stringdata)
        return usersArray
    }
    catch (error) {
        return []
    }
    
}


let checkUsername = function(username) {
    let usersArray = loadUsers()
    for(var i=0 ; i<usersArray.length ; i++){
        if(usersArray[i].username==username){
            return true
        }
    }
    return false
}

let addUser = function(user,pass) {
    let usersArray = loadUsers()
    var newUser = {username:user , password:pass , watchlist:[]}
    usersArray.push(newUser)
    fs.writeFileSync('users.json',JSON.stringify(usersArray))
}


app.get('/' , function(req,res) {
    res.redirect('login')
})


app.get('/login' , function(req,res) {
    res.render('login' , {msgUsername:"" , msgPassword:"" , msgPopup:""})
})


app.get('/registration/' ,  function(req,res){
    res.render('registration' , {msgUsername:"" , msgPassword:"" , msgPopup:""})
})


app.post('/registration/' , function(req,res) {
    
    if (req.body.username=="")
    {
        res.render('registration' , {msgUsername:"Username cannot be left blank" , msgPassword:"" , msgPopup:""})
    }
    else if (req.body.password=="")
    {
        res.render('registration' , {msgUsername:"" , msgPassword:"Password cannot be left blank" , msgPopup:""})
    }
    else if (checkUsername(req.body.username))
    {
        res.render('registration' , {msgUsername:"Username already exists" , msgPassword:"" , msgPopup:""})
    }
    else
    {
        addUser(req.body.username,req.body.password)
        res.render('login' , {msgUsername:"" , msgPassword:"" , msgPopup:"Registration is successful"})
    }
})


//Milestone 2

//1

app.get('/home' , function(req,res) {
    res.render('home')
})


app.post('/search' , function(req,res) {
    res.render('searchresults' , {moviesArray: searchMovies(req.body.Search)})
})
    

app.get('/watchlist' , function(req,res) {
    var movies = loadWatchlist(req.session.username)
    res.render('watchlist' , {watchlist:movies})
})


app.get('/action' , function(req,res) {
    res.render('action')
})


app.get('/drama' , function(req,res) {
    res.render('drama')
})


app.get('/horror' , function(req,res) {
    res.render('horror')
})


app.get('/conjuring' , function(req,res) {
    res.render('conjuring' , {flag:movieInWatchlist(req.session.username,"The Conjuring (2013)")})
})


app.post('/conjuring' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"The Conjuring (2013)"))
    {
        addToWatchlist(req.session.username,"The Conjuring (2013)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Conjuring (2013)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Conjuring (2013)") , msg:"Movie already in watchlist"}))
    }
})


app.get('/darkknight' , function(req,res) {
    res.render('darkknight' , {flag:movieInWatchlist(req.session.username,"The Dark Knight (2008)")})
})


app.post('/darkknight' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"The Dark Knight (2008)"))
    {
        addToWatchlist(req.session.username,"The Dark Knight (2008)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Dark Knight (2008)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Dark Knight (2008)") , msg:"Movie already in watchlist"}))
    }
})


app.get('/fightclub' , function(req,res) {
    res.render('fightclub' , {flag:movieInWatchlist(req.session.username,"Fight Club (1999)")})
})  


app.post('/fightclub' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"Fight Club (1999)"))
    {
        addToWatchlist(req.session.username,"Fight Club (1999)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"Fight Club (1999)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"Fight Club (1999)") , msg:"Movie already in watchlist"}))
    }
})


app.get('/godfather' , function(req,res) {
    res.render('godfather' , {flag:movieInWatchlist(req.session.username,"The Godfather (1972)")})
})


app.post('/godfather' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"The Godfather (1972)"))
    {
        addToWatchlist(req.session.username,"The Godfather (1972)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Godfather (1972)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Godfather (1972)") , msg:"Movie already in watchlist"}))
    }
})


app.get('/godfather2' , function(req,res) {
    res.render('godfather2' , {flag:movieInWatchlist(req.session.username,"The Godfather: Part II (1974)")})
})


app.post('/godfather2' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"The Godfather: Part II (1974)"))
    {
        addToWatchlist(req.session.username,"The Godfather: Part II (1974)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Godfather: Part II (1974)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"The Godfather: Part II (1974)") , msg:"Movie already in watchlist"}))
    }
})


app.get('/scream' , function(req,res) {
    res.render('scream' , {flag:movieInWatchlist(req.session.username,"Scream (1996)")})
})


app.post('/scream' , function(req,res) {
    if(!movieInWatchlist(req.session.username,"Scream (1996)"))
    {
        addToWatchlist(req.session.username,"Scream (1996)")
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"Scream (1996)") , msg:""}))
    }
    else
    {
        res.send(JSON.stringify({flag:movieInWatchlist(req.session.username,"Scream (1996)") , msg:"Movie already in watchlist"}))
    }
})


//2

let checkPasswordOfUser = function(username,password) {
    let usersArray = loadUsers()
    for(var i=0 ; i<usersArray.length ; i++){
        if(usersArray[i].username==username){
            if (usersArray[i].password==password)
            return true
            else
            return false
        }
    }
    return false
}


app.post('/login' , function(req,res) {
    if (req.body.username=="")
    {
        res.render('login' , {msgUsername:"Username cannot be left blank" , msgPassword:"" , msgPopup:""})
    }
    else if (req.body.password=="")
    {
        res.render('login' , {msgUsername:"" , msgPassword:"Password cannot be left blank" , msgPopup:""})
    }
    else if (!checkUsername(req.body.username))
    {
        res.render('login' , {msgUsername:"Wrong Username" , msgPassword:"" , msgPopup:""})
    }
    else if (!checkPasswordOfUser(req.body.username,req.body.password))
    {
        res.render('login' , {msgUsername:"" , msgPassword:"Wrong Password" , msgPopup:""})
    }
    else 
    {
        req.session.username = req.body.username
        res.redirect('home')
    }
})


//4

let movieInWatchlist = function(username,movie) {
    let watchlist = loadWatchlist(username)
    if (watchlist.includes(movie)) {
        return true
    }
    return false
}


let addToWatchlist = function(username,movie) {
    let usersArray = loadUsers()
    let watchlist = loadWatchlist(username)
    if (!watchlist.includes(movie)) {
        watchlist.push(movie)
        for(var i=0 ; i<usersArray.length ; i++) {
            if(usersArray[i].username==username){
                usersArray[i].watchlist = watchlist
            }
        }
    }
    fs.writeFileSync('users.json',JSON.stringify(usersArray))
}


//5

let loadWatchlist = function(username) {
    let buffereddata = fs.readFileSync('users.json')
    let stringdata = buffereddata.toString()
    let usersArray = JSON.parse(stringdata)
    let watchlist = []
    for(var i=0 ; i<usersArray.length ; i++) {
        if(usersArray[i].username==username){
            watchlist = usersArray[i].watchlist
        }
    }
    return watchlist
}


//6

let loadMovies = function() {
    try {
        let buffereddata = fs.readFileSync('movies.json')
        let stringdata = buffereddata.toString()
        let moviesArray = JSON.parse(stringdata)
        return moviesArray
    }
    catch (error) {
        return []
    }  
}


let searchMovies = function(movie) {
    let moviesArray = loadMovies()
    let searchResult = []
    let movieLower = movie.toLowerCase();
    for( var i=0 ; i<moviesArray.length ; i++)
    {
        if(moviesArray[i].toLowerCase().includes(movieLower)){
            searchResult.push(moviesArray[i])
        }
    }
  return searchResult
}


