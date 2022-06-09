import { LocaleDataModel } from "@core/models/local/locale.model";

const shop: LocaleDataModel = {
  header: 'Магазин',
  header_detail: 'Наш маркетплейс с официальным мерчем и товарами наших партнеров.',
  pages: {
    own: "Біздің тауар",
    organization: "Серіктес өнімдер",
    delivery: "Жеткізу және төлеу"
  },
  detail: {
    order: 'Сіздің тапсырысыңыз',
    name_placeholder: 'Атыңызды енгізіңіз',
    email_placeholder: 'Электрондық поштаны енгізіңіз',
    city_placeholder: 'Қалаңызді енгізіңіз',
    postid_placeholder: 'Пошта индексін енгізіңіз',
    address_placeholder: 'Мекенжайды енгізіңіз',
    phone_placeholder: 'Телефон нөмірін енгізіңіз',
    sum_price: 'Жалпы сома:',
    delivery: {
      select: 'Жеткізу түрін таңдаңыз:',
      city: 'Алматы қаласы бойынша жеткізу',
      own: 'Алып кету (Алматы)',
      country: 'Қазақстан бойынша жеткізу'
    },
    no_products: 'Бос себет',
    create_order: 'Тапсырыс беру',
    location: {
      label: "Тапсырысты алып кете аласыз:",
      title: 'Алматы қаласы, Достық даңғылы 162/4 (Гарышкер кеңсесі)'
    },
    close: "Артқа",
    message: {
      added: 'Өнім тізімге қосылды',
      exists: 'Өнім тізімде әлдеқашан бар',
      success: 'Тапсырыс сәтті аяқталды!'
    },
    select_size: 'Өлшемді таңдаңыз',
    add_to_card: 'Себетке қосу',
    size: 'Көлемі',
    compound: 'Құрама',
    care: 'Қамқорлық'
  }
};

export default shop;
