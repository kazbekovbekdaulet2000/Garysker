export interface UserTypes {
  name: string
  icon: string
  description: string
}

export interface InputConfig {
  helper?: string
  type: 'birth-date' | 'input' | 'city-selector' | 'user-type' | 'goals' | 'password' | 'email'
  placeholder?: string
  key?: string
  userTypes?: UserTypes[]
  error?: string
}

export interface StageModel {
  name: string
  small_text: string
  title: string
  label: string
  icon: string
  config?: InputConfig[]
}

export const SignUpPageOne: StageModel = {
  name: 'О вас',
  small_text: 'пройти и зарегистрироваться',
  title: "Давайте начнем со знакомства",
  label: "Заполните форму ниже",
  icon: "assets/icons/person.svg",
  config: [
    {
      type: 'input',
      placeholder: 'Введите имя',
      key: 'name',
      error: 'имя не заполнена'
    },
    {
      type: 'input',
      placeholder: 'Введите фамилию',
      key: 'surname',
      error: 'фамилия не заполнена'
    },
    {
      helper: 'Дата рождения',
      type: 'birth-date',
      placeholder: 'дд/мм/гггг',
      key: 'birth_date',
      error: 'неправильный формат'
    }
  ]
}

export const SignUpPageTwo: StageModel = {
  name: 'Деятельность',
  small_text: 'пройти и зарегистрироваться',
  title: "Расскажите откуда вы и чем занимаетесь?",
  label: "Заполните форму ниже",
  icon: "assets/icons/about-page.svg",
  config: [
    {
      type: 'city-selector',
      placeholder: 'Выберите город',
      key: 'city',
      error: 'выберите город'
    },
    {
      type: 'user-type',
      placeholder: 'Чем вы занимаетесь?',
      key: 'user_type',
      error: 'выберите чем вы занимаетесь'
    },
  ]
}

export const SignUpPageThree: StageModel = {
  name: 'Ценности проекта',
  small_text: 'пройти и зарегистрироваться',
  title: "Наши ценности",
  label: "Нажимая кнопку “принять”, вы соглашаетесь и разделяете наши ценности",
  icon: "assets/icons/star.svg",
  config: [
    {
      type: 'goals',
      key: 'goals',
      userTypes: [
        {
          name: 'Люди',
          icon: 'assets/images/nerd-face.png',
          description: 'для нас важны люди, а не продукт'
        },
        {
          name: 'Саморазвитие',
          icon: 'assets/images/idea.png',
          description: 'хочу предложить полезный продукт/компанию'
        },
        {
          name: 'Честность',
          icon: 'assets/images/wow-face.png',
          description: 'хочу общаться с близкими по духу людьми'
        }
      ]
    }
  ]
}

export const SignUpPageFour: StageModel = {
  name: 'Данные для входа',
  small_text: 'пройти и зарегистрироваться',
  title: "Данные для входа",
  label: "пройти и зарегистрироваться",
  icon: "assets/icons/message.svg",
  config: [
    {
      type: 'email',
      placeholder: 'Введите электронную почту',
      key: 'email',
      error: 'напишите в правильном формате'
    },
    {
      type: 'password',
      placeholder: 'Придумайте пароль',
      key: 'password',
      error: 'надо ввести больше 8 знаков для пароля'
    },
    {
      type: 'password',
      placeholder: 'Повторно введите пароль',
      key: 're_password',
      error: 'пароли не совпадают'
    },
  ]
} 