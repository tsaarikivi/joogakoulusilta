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
export const SEEDDATA = {
  places:{
    place_111111111:{
          name: "Kauppatori",
          address: "Pohjoisesplanadi",
          address_url: "https://www.google.fi/maps/place/Market+Square/@60.1672485,24.9455676,16z/data=!4m5!3m4!1s0x0000000000000000:0xc5acf882c8111bd5!8m2!3d60.1676648!4d24.9536794",
          picture_url: "https://lh6.googleusercontent.com/proxy/YS2atkrBHnHnybmZ5_msRFWTlZldaDvM8_m_LE_nTVFtN7hpqmA2YdB2iOxq6Kfp3y4ggk3Axrt2mo3gmk_ClBf4RGaNvg=w408-h306",
    },
    place_2222222222:{
          name: "Mökkerö",
          address: "Jokikunta",
          address_url: "https://www.google.fi/maps/@60.4218263,24.1823504,17z",
          picture_url: "https://www.google.fi/maps/@60.4218263,24.1823504,466m/data=!3m1!1e3"
    },
    place_333333333:{
          name: "Kotipaikka",
          address: "Hakolahdentie 2",
          address_url: "https://www.google.fi/maps/@60.1574715,24.8739207,16.75z?hl=en",
          picture_url: "https://www.google.fi/maps/place/hakolahdentie+2/@60.1567644,24.8720107,3a,75y,163.88h,90t/data=!3m7!1e1!3m4!1sB76UhLpOR5-SZ75VLoadfw!2e0!7i13312!8i6656!4b1!4m2!3m1!1s0x0:0xff244a973da65a8d!6m1!1e1"
    },
  },
instructors:{
  ohjaaja_11111:{
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
  ohjaaja_222222:{
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
 classes:{
   monday:{
      class_mon_1111111:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
      class_mon_2222222:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
   },
   tuesday:{
      class_tue_1111111:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
      class_tue_2222222:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
   },
   wednesday:{
      class_wed_1111111:{
          place: "place-111111111",
          instructor: "ohjaaja-11111",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
      class_wed_2222222:{
          place: "place-2222222222",
          instructor: "ohjaaja-222222",
          name: "Flow Jooga",
          start: "16:00",
          end: "18:00",
      },
    },
  }
}
