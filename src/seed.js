//=========================================
// This file is a specification of the
// database and seed data for the Firebase database
// If you make modifications to database,
// please add comment what what modified
//=========================================
// version 0.1, Tuomo
// -Initial version
//=========================================
// version y.x, ??
// ??
//=========================================
var JOOGA_SEED = {
//--------------begin places---------------------------
  places:{
    place: { key: "place-111111111",
      data: {
          name: "Kauppatori",
          address: "Pohjoisesplanadi",
          address_url: "https://www.google.fi/maps/place/Market+Square/@60.1672485,24.9455676,16z/data=!4m5!3m4!1s0x0000000000000000:0xc5acf882c8111bd5!8m2!3d60.1676648!4d24.9536794",
          picture_url: "https://lh6.googleusercontent.com/proxy/YS2atkrBHnHnybmZ5_msRFWTlZldaDvM8_m_LE_nTVFtN7hpqmA2YdB2iOxq6Kfp3y4ggk3Axrt2mo3gmk_ClBf4RGaNvg=w408-h306"
      },
    },
    place: { key: "place-2222222222",
      data: {
          name: "Mökkerö",
          address: "Jokikunta",
          address_url: "https://www.google.fi/maps/@60.4218263,24.1823504,17z",
          picture_url: "https://www.google.fi/maps/@60.4218263,24.1823504,466m/data=!3m1!1e3"
      },
    },
    place: { key: "place-333333333",
      data: {
          name: "Kotipaikka",
          address: "Hakolahdentie 2",
          address_url: "https://www.google.fi/maps/@60.1574715,24.8739207,16.75z?hl=en",
          picture_url: "https://www.google.fi/maps/place/hakolahdentie+2/@60.1567644,24.8720107,3a,75y,163.88h,90t/data=!3m7!1e1!3m4!1sB76UhLpOR5-SZ75VLoadfw!2e0!7i13312!8i6656!4b1!4m2!3m1!1s0x0:0xff244a973da65a8d!6m1!1e1"
      },
    },
  },
//-------------end places-----------------------

//----------------begin instructor--------------
instructors:{
  instructor:{ key: "ohjaaja-11111",
    data: {
      name: "SAtu Joogi",
      contact: {
        phone: "+358 40 9887298",
        email: "k.k@jooga.silta",
        picture_url: "http://blog.holvi.com/wp-content/uploads/2015/05/Satu-161.jpg"
      },
      ratings:{
        rating:{comment: "tosi hyvä",
          date: "11.1.2016",
          stars: 4,
        },
        rating:{comment: "venyy ja paukkuu",
          date: "17.1.2016",
          stars: 3,
        },
      },
    },
  },
  instructor:{ key: "ohjaaja-222222",
    data: {
      name: "Vieteri Veikko",
      contact: {
        phone: "+358 40 3455532",
        email: "v.v@jooga.silta",
        picture_url: "http://yle.fi/aihe/sites/aihe/files/migrated/akuutti_ohjelmat/u4145/raisanen_01_0.jpg"
      },
      ratings:{
        rating:{comment: "rajua menoa",
          date: "11.1.2016",
          stars: 4,
        },
        rating:{comment: "otetaan uusiksi..",
          date: "17.1.2016",
          stars: 3,
        },
      },
    },
  },
},
//----------------end instructor----------------

//-------------begin classes--------------------
 classes:{
   monday:{
      class:{ key: "class-mon-1111111",
        data:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
      class:{ key: "class-mon-2222222",
        data:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
   },
   tuesday:{
      class:{ key: "class-tue-1111111",
        data:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
      class:{ key: "class-tue-2222222",
        data:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
   },
   wednesday:{
      class:{ key: "class-wed-1111111",
        data:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
      class:{ key: "class-wed-2222222",
        data:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
        },
      },
   },
 }
//-------------end classes------------------------
}

module.export = JOOGA_SEED
