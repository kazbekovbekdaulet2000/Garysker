import { LocaleDataModel } from "@core/models/local/locale.model";

const shop: LocaleDataModel = {
  header: 'Магазин',
  header_detail: 'Наш маркетплейс с официальным мерчем и товарами наших партнеров.',
  pages: {
    own: "Наш мерч",
    organization: "Продкуты партнеров",
    delivery: "Доствка и оплата"
  },
  detail: {
    order: 'Ваш заказ',
    name_placeholder: 'Введите имя',
    email_placeholder: 'Введите email',
    city_placeholder: 'Введите город',
    postid_placeholder: 'Введите почтвый индекс',
    address_placeholder: 'Введите адрес',
    phone_placeholder: 'Введите номер телефона',
    sum_price: 'Общая сумма:',
    delivery: {
      select: 'Выберите тип доставки:',
      city: 'Доставка по городу Алматы',
      own: 'Самовывоз (г. Алматы)',
      country: 'Доставка по Казахстану'
    },
    no_products: 'Пустая корзина',
    create_order: 'Оформить заказ',
    location: {
      label: "Заказ вы можете забрать:",
      title: 'Город Алматы, улица Желтоксан 168A (Офис Garyshker)'
    },
    close: "Назад",
    message: {
      added: 'Товар добавлен в список',
      exists: 'Товар уже есть в списке',
      success: 'Заказ оформлен успешно!'
    },
    select_size: 'Выберите размер',
    add_to_card: 'Добавить в корзину',
    size: 'Размер',
    compound: 'Состав',
    care: 'Уход'
  }
};

export default shop;
