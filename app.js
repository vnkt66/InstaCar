const express = require('express');
const mongoose = require('mongoose');

const stripe = require("stripe")("stripe_public_key");
const uuid = require("uuid/v4");

const jwt = require('jsonwebtoken');

var sessions   = require("client-sessions");
var bcrypt     = require('bcryptjs');
var helmet     = require("helmet");

var distance = require('google-distance');
distance.apiKey = 'googlekey';

const path = require('path');
var router  = express.Router();
const cors  = require('cors');
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require('body-parser');
// var session = require('express-session'); 
mongoose.set('useCreateIndex', true);

var url = "mongodb+srv://<username>:<password>@instacar-jpz0g.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost/aq-index"

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use(session({
//     secret: 'uidjdj89938jdjd',
//     resave: true,             
//     saveUninitialized: true   
// }));

var userSchema = new mongoose.Schema({
    username      : {type: String, required: true},
    phone         : {type: String, required: true, unique: true}, 
    email         : {type: String, required: true, unique: true},
    password      : {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

app.use(sessions({
    cookieName: 'session',
    secret: 'uehdkfiml67358zajbffolsm',
    duration: 30 * 60 * 1000, 
    activeDuration: 5 * 60 * 1000, 
    httpOnly: true,  
    secure: true,     
    ephemeral: true 
}));

app.use(helmet());

app.use(cors());
app.use('/aq-index', router);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); 
    });
}

router.post('/register', (req, res) => {
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    let user = new User(req.body);
    user.save((err, saveddata) => {
        if(err) {
            console.log(err);
            let error = "something bad happenned! please try again.";
            if(err.code === 11000) {
                error = "That email id is already taken, please try another";
            }
            res.send({error: error});
        } else {
            res.send({custdata: {username: req.body.username, usermail: req.body.email, phone: req.body.phone}});
        }
    });
});

router.post('/login', (req, res) => {
    console.log(req);
    User.findOne({ email: req.body.email }, (err, founddata) => {
        if(err || !founddata || !bcrypt.compareSync(req.body.password, founddata.password)) {
            res.send({error: 'Incorrect email / password.'});
        } else {
            // console.log(req.body);
            jwt.sign({user: req.body.email}, 'secretkey', { expiresIn: '80s' }, (err, token) => {
                console.log(token);
                res.send({token: token});
            })
        }
    });
});



router.post('/roundtrip', (req, res) => {
  console.log(req);
  console.log(new Date(req.body.rounddata.onedate).getDay());
  var starttime = new Date(req.body.rounddata.twodate).getTime();
  var endtime = new Date(req.body.rounddata.onedate).getTime();

  console.log(starttime);

  let Time = starttime - endtime;
  let Days = Math.ceil(Time / (86400000));

  // When Using Google Maps Api to get distance in kms

//   distance.get(
//     {
//       origin: req.body.rounddata.oneval,
//       destination: req.body.rounddata.twoval
//     }, (err, data) => {
//         res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: data.distancevalue}});
//     })
  console.log(Time);
  console.log(Days);
  res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: 347000}});
})

router.post('/multitrip', (req, res) => {
    console.log(req.body);
    console.log(new Date(req.body.multidata.onedeparture).getDay());
    if(req.body.multidata.oneone !== '' && req.body.multidata.onetwo !== '' && req.body.multidata.threetwo === '') {
    console.log(req.body.multidata.twodeparture);
    var starttime = new Date(req.body.multidata.twodeparture).getTime();
    var endtime = new Date(req.body.multidata.onedeparture).getTime();

    console.log(new Date(req.body.multidata.twodeparture).getTime());
    console.log(endtime);
  
    let Time = starttime - endtime;
    let Days = Math.ceil(Time / (86400000));
  
    // When Using Google Maps Api to get distance in kms
  
  //   distance.get(
  //     {
  //       origin: req.body.rounddata.oneval,
  //       destination: req.body.rounddata.twoval
  //     }, (err, data) => {
  //         res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: data.distancevalue}});
  //     })
    console.log(Time);
    console.log(Days);
    res.send({multidata: {multistarttime: starttime, multiendtime: endtime, days: Days, distanceonevalue: 347000, distancetwovalue: 347000, endpoints: 2}});
    }
    if(req.body.multidata.fivetwo !== '') {
        var starttime = new Date(req.body.multidata.fivedeparture).getTime();
        var endtime = new Date(req.body.multidata.onedeparture).getTime();
        let Time = starttime - endtime;
        let Days = Math.ceil(Time / (86400000));
      
        // When Using Google Maps Api to get distance in kms
      
      //   distance.get(
      //     {
      //       origin: req.body.rounddata.oneval,
      //       destination: req.body.rounddata.twoval
      //     }, (err, data) => {
      //         res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: data.distancevalue}});
      //     })
        console.log(Time);
        console.log(Days);
        res.send({multidata: {multistarttime: starttime, multiendtime: endtime, days: Days, distanceonevalue: 347000, distancetwovalue: 347000, distancethreevalue: 347000, distancefourvalue: 347000, distancefivevalue: 347000, endpoints: 5}});
    }
    if(req.body.multidata.fivetwo === '') {
        var starttime = new Date(req.body.multidata.fourdeparture).getTime();
        var endtime = new Date(req.body.multidata.onedeparture).getTime();
        let Time = starttime - endtime;
        let Days = Math.ceil(Time / (86400000));
      
        // When Using Google Maps Api to get distance in kms
      
      //   distance.get(
      //     {
      //       origin: req.body.rounddata.oneval,
      //       destination: req.body.rounddata.twoval
      //     }, (err, data) => {
      //         res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: data.distancevalue}});
      //     })
        console.log(Time);
        console.log(Days);
        res.send({multidata: {multistarttime: starttime, multiendtime: endtime, days: Days, distanceonevalue: 347000, distancetwovalue: 347000, distancethreevalue: 347000, distancefourvalue: 347000,endpoints: 4}});
    }
    if(req.body.multidata.fourtwo === '') {
    var starttime = new Date(req.body.multidata.threedeparture).getTime();
    var endtime = new Date(req.body.multidata.onedeparture).getTime();
    let Time = starttime - endtime;
    let Days = Math.ceil(Time / (86400000));
  
    // When Using Google Maps Api to get distance in kms
  
  //   distance.get(
  //     {
  //       origin: req.body.rounddata.oneval,
  //       destination: req.body.rounddata.twoval
  //     }, (err, data) => {
  //         res.send({rounddata: {roundstarttime: starttime, roundendtime: endtime, days: Days, distancevalue: data.distancevalue}});
  //     })
    console.log(Time);
    console.log(Days);
    res.send({multidata: {multistarttime: starttime, multiendtime: endtime, days: Days, distanceonevalue: 347000, distancetwovalue: 347000, distancethreevalue: 347000, endpoints: 3}});
    }
  })

router.post('/package', (req, res) => {
    console.log(req);
    var from = req.body.packdata.state;
    var package = req.body.packdata.package;
    var date = req.body.packdata.date
    res.send({packdata: {
       From: from,
       package: package,
       date: date
    }})
})

router.post('/book', (req, res) => {
          var distancevalue = req.body.data.distancevalue;
          var Days = req.body.data.days;
          var drivercharge = req.body.data.drivercharger;
          var carrate;
          console.log(distancevalue);
          if(distancevalue < 300000) {
            if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (300 * drivercharge + 250);
            } else {
            // for(var i=0; i<=Days; i++) {
                // var start = 300; 
                distancekm = Math.floor(data.distancevalue / 1000);
                var pay = Days * 250;
                carrate = (300 * drivercharge + pay);
            // }
        }
          } 
          else if(distancevalue > 300000) {
              distancekm = Math.floor(distancevalue / 1000);
              if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (300 * drivercharge + 250);
                } else {
            //   for(var i=0; i<=Days; i++) {
                // var start = 300;
                // if(i === 0) {
                // distancekm = Math.floor(distancevalue / 1000);
                // carrate = (distancekm * 15 + 450);
                // } 
                // else {
                distancekm = Math.floor(distancevalue / 1000);
                var pay = Days * 250;
                carrate = (distancekm * drivercharge + pay);
                // }
            // }
          }
        }
          res.send({
              rounddata: {
                  days: Days, carrate: carrate, 
                  distancevalue: distancevalue, 
                  roundstarttime: req.body.data.roundstarttime, 
                  roundendtime: req.body.data.roundendtime, 
                  drivername: req.body.data.drivername, 
                  drivercar: req.body.data.drivercar, 
                  driverlanguage: req.body.data.driverlanguage, 
                  drivercharge: req.body.data.drivercharger
                }
            }
                );
      });

 router.post('/multibook', (req, res) => {
    if(req.body.data.endpoints === 5) {
        var distanceonevalue = req.body.data.distanceonevalue;
        var distancetwovalue = req.body.data.distancetwovalue;
        var distancethreevalue = req.body.data.distancethreevalue;
        var distancefourvalue = req.body.data.distancefourvalue;
        var distancefivevalue = req.body.data.distancefivevalue;
        var distancevalue = distanceonevalue + distancetwovalue + distancethreevalue + distancefourvalue + distancefivevalue;
        console.log(distancevalue);
              var Days = req.body.data.days;
              var drivercharge = req.body.data.drivercharger;
              var carrate;
              console.log(distancevalue);
              if(distancevalue < 300000) {
                if(Days === 0) {
                    distancekm = Math.floor(distancevalue / 1000);
                    carrate = (300 * drivercharge + 250);
                } else {
                // for(var i=0; i<=Days; i++) {
                    // var start = 300; 
                    distancekm = Math.floor(data.distancevalue / 1000);
                    var pay = 250 * Days;
                    carrate = (300 * drivercharge + pay);
                // }
            }
              } 
              else if(distancevalue > 300000) {
                  distancekm = Math.floor(distancevalue / 1000);
                  if(Days === 0) {
                    distancekm = Math.floor(distancevalue / 1000);
                    carrate = (300 * drivercharge + 250);
                    } else {
                //   for(var i=0; i<=Days; i++) {
                    // var start = 300;
                    // if(i === 0) {
                    // distancekm = Math.floor(distancevalue / 1000);
                    // carrate = (distancekm * 15 + 450);
                    // } 
                    // else {
                    distancekm = Math.floor(distancevalue / 1000);
                    var pay = 250 * Days;
                    carrate = (distancekm * drivercharge + pay);
                    // }
                // }
              }
            }
              res.send({
                  multidata: {
                      days: Days, 
                      carrate: carrate, 
                      distancevalue: distancevalue, 
                      multistarttime: req.body.data.multistarttime, 
                      multiendtime: req.body.data.multiendtime, 
                      drivername: req.body.data.drivername, 
                      drivercar: req.body.data.drivercar, 
                      driverlanguage: req.body.data.driverlanguage, 
                      drivercharge: req.body.data.drivercharger
                    }
                }
                    );
        }
    
    if(req.body.data.endpoints === 4) {
    var distanceonevalue = req.body.data.distanceonevalue;
    var distancetwovalue = req.body.data.distancetwovalue;
    var distancethreevalue = req.body.data.distancethreevalue;
    var distancefourvalue = req.body.data.distancefourvalue;
    var distancevalue = distanceonevalue + distancetwovalue + distancethreevalue + distancefourvalue;
    console.log(distancevalue);
          var Days = req.body.data.days;
          var drivercharge = req.body.data.drivercharger;
          var carrate;
          console.log(distancevalue);
          if(distancevalue < 300000) {
            if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (300 * drivercharge + 250);
            } else {
            // for(var i=0; i<=Days; i++) {
                // var start = 300; 
                distancekm = Math.floor(data.distancevalue / 1000);
                var pay = 250 * Days;
                carrate = (300 * drivercharge + pay);
            // }
        }
          } 
          else if(distancevalue > 300000) {
              distancekm = Math.floor(distancevalue / 1000);
              if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (distancekm * drivercharge + 250);
                } else {
            //   for(var i=0; i<=Days; i++) {
                // var start = 300;
                // if(i === 0) {
                // distancekm = Math.floor(distancevalue / 1000);
                // carrate = (distancekm * 15 + 450);
                // } 
                // else {
                distancekm = Math.floor(distancevalue / 1000);
                var pay = 250 * Days;
                carrate = (distancekm * drivercharge + pay);
                // }
            // }
          }
        }
          res.send({
              multidata: {
                  days: Days, 
                  carrate: carrate, 
                  distancevalue: distancevalue, 
                  multistarttime: req.body.data.multistarttime, 
                  multiendtime: req.body.data.multiendtime, 
                  drivername: req.body.data.drivername, 
                  drivercar: req.body.data.drivercar, 
                  driverlanguage: req.body.data.driverlanguage, 
                  drivercharge: req.body.data.drivercharger
                }
            }
                );
    }
    if(req.body.data.endpoints === 3) {
    var distanceonevalue = req.body.data.distanceonevalue;
    console.log(distanceonevalue);
    var distancetwovalue = req.body.data.distancetwovalue;
    console.log(distancetwovalue);
    var distancethreevalue = req.body.data.distancethreevalue;
    var distancevalue = distanceonevalue + distancetwovalue + distancethreevalue;
    console.log(distancevalue);
          var Days = req.body.data.days;
          var drivercharge = req.body.data.drivercharger;
          var carrate;
          console.log(distancevalue);
          if(distancevalue < 300000) {
            if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (300 * drivercharge + 250);
            } else {
            // for(var i=0; i<=Days; i++) {
                // var start = 300; 
                distancekm = Math.floor(data.distancevalue / 1000);
                var pay = Days * 250;
                carrate = (300 * drivercharge + pay);
            // }
        }
          } 
          else if(distancevalue > 300000) {
              distancekm = Math.floor(distancevalue / 1000);
              if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (distancekm * drivercharge + 250);
                } else {
            //   for(var i=0; i<=Days; i++) {
                // var start = 300;
                // if(i === 0) {
                // distancekm = Math.floor(distancevalue / 1000);
                // carrate = (distancekm * 15 + 450);
                // } 
                // else {
                distancekm = Math.floor(distancevalue / 1000);
                var pay = Days * 250;
                carrate = (distancekm * drivercharge + pay);
                // }
            // }
          }
        }
          res.send({
              multidata: {
                  days: Days, 
                  carrate: carrate, 
                  distancevalue: distancevalue, 
                  multistarttime: req.body.data.multistarttime, 
                  multiendtime: req.body.data.multiendtime, 
                  drivername: req.body.data.drivername, 
                  drivercar: req.body.data.drivercar, 
                  driverlanguage: req.body.data.driverlanguage, 
                  drivercharge: req.body.data.drivercharger
                }
            }
                );
    }
    if(req.body.data.endpoints === 2) {
    var distanceonevalue = req.body.data.distanceonevalue;
    console.log(distanceonevalue);
    var distancetwovalue = req.body.data.distancetwovalue;
    console.log(distancetwovalue);
    var distancevalue = distanceonevalue + distancetwovalue;
    console.log(distancevalue);
          var Days = req.body.data.days;
          var drivercharge = req.body.data.drivercharger;
          var carrate;
          console.log(distancevalue);
          if(distancevalue < 300000) {
            if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (300 * drivercharge + 250);
            } else {
            // for(var i=0; i<=Days; i++) {
                // var start = 300; 
                distancekm = Math.floor(data.distancevalue / 1000);
                var pay = Days * 250;
                carrate = (300 * drivercharge + pay);
            // }
        }
          } 
          else if(distancevalue > 300000) {
              distancekm = Math.floor(distancevalue / 1000);
              if(Days === 0) {
                distancekm = Math.floor(distancevalue / 1000);
                carrate = (distancekm * drivercharge + 250);
                } else {
            //   for(var i=0; i<=Days; i++) {
                // var start = 300;
                // if(i === 0) {
                // distancekm = Math.floor(distancevalue / 1000);
                // carrate = (distancekm * 15 + 450);
                // } 
                // else {
                distancekm = Math.floor(distancevalue / 1000);
                var pay = Days * 250;
                carrate = i * (distancekm * drivercharge + pay);
                // }
            // }
          }
        }
          res.send({
              multidata: {
                  days: Days, 
                  carrate: carrate, 
                  distancevalue: distancevalue, 
                  multistarttime: req.body.data.multistarttime, 
                  multiendtime: req.body.data.multiendtime, 
                  drivername: req.body.data.drivername, 
                  drivercar: req.body.data.drivercar, 
                  driverlanguage: req.body.data.driverlanguage, 
                  drivercharge: req.body.data.drivercharger
                }
            }
                );
        }
 })

router.post('/checkout', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if(err) {
        res.send({msg: 'token expired'});
        } else {
          res.send({msg: 'Post created...'});
        }
      });
})

router.post("/payment", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { roundtrip, packtrip, multitrip, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();

      if(roundtrip !== '') {
      const charge = await stripe.charges.create(
        {
          amount: roundtrip.carrate,
          currency: "INR",
          customer: customer.id,
          receipt_email: token.email,
          description: `Booked ${roundtrip.drivercar}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    }
    else if(multitrip !== '') {
        const charge = await stripe.charges.create(
            {
              amount: multitrip.carrate,
              currency: "INR",
              customer: customer.id,
              receipt_email: token.email,
              description: `Booked ${multitrip.drivercar}`,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
                }
              }
            },
            {
              idempotency_key
            }
          );
          console.log("Charge:", { charge });
          status = "success";
    }
    else if(packtrip !== '') {
        const charge = await stripe.charges.create(
            {
              amount: packtrip.charge,
              currency: "INR",
              customer: customer.id,
              receipt_email: token.email,
              description: `Booked ${roundtrip.drivercar}`,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
                }
              }
            },
            {
              idempotency_key
            }
          );
          console.log("Charge:", { charge });
          status = "success";
    }
} 
    catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status});
  });

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

app.listen(PORT, function() {
    console.log('SERVER STARTED', + PORT);
});
