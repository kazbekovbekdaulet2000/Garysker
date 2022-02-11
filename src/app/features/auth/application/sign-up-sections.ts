export interface UserTypes{
  name: string
  icon: string
  description: string
}

export interface InputConfig {
  helper?: string
  type: 'birth-date' | 'input' | 'city-selector' | 'user-type' | 'password' | 'email'
  placeholder?: string
  property?: string
  userTypes?: UserTypes[]
}

export interface StageModel {
  name: string
  small_text: string
  title: string
  label: string
  icon: string
  config?: InputConfig[]
}

export const SignUpSections: StageModel[] = [
  {
    name: 'О вас',
    small_text: 'пройти и зарегистрироваться',
    title: "Давайте начнем со знакомства",
    label: "Заполните форму ниже",
    icon: "assets/icons/person.svg",
    config: [
      {
        type: 'input',
        placeholder: 'Введите имя',
        property: 'name'
      },
      {
        type: 'input',
        placeholder: 'Введите фамилию',
        property: 'surname'
      },
      {
        helper: 'Дата рождения',
        type: 'birth-date',
        placeholder: 'Введите имя',
        property: 'birth_date'
      }
    ]
  },
  {
    name: 'Деятельность',
    small_text: 'пройти и зарегистрироваться',
    title: "Расскажите откуда вы и чем занимаетесь?",
    label: "Заполните форму ниже",
    icon: "assets/icons/about-page.svg",
    config: [
      {
        type: 'city-selector',
        placeholder: 'Выберите город',
        property: 'city'
      },
      {
        type: 'input',
        placeholder: 'Чем вы занимаетесь?',
        property: 'info'
      },
    ]
  },
  {
    name: 'Ценности проекта',
    small_text: 'пройти и зарегистрироваться',
    title: "Наши ценности",
    label: "Нажимая кнопку “принят”, вы соглашаетесь и разделяете наши ценности",
    icon: "assets/icons/star.svg",
    config: [
      {
        type: 'user-type',
        property: 'user-type',
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
      },
    ]
  },
  {
    name: 'Данные для входа',
    small_text: 'пройти и зарегистрироваться',
    title: "Данные для входа",
    label: "пройти и зарегистрироваться",
    icon: "assets/icons/message.svg",
    config: [
      {
        type: 'email',
        placeholder: 'Введите электронную почту',
        property: 'email'
      },
      {
        type: 'password',
        placeholder: 'Придумайте пароль',
        property: 'password'
      },
      {
        type: 'password',
        placeholder: 'Повторно введите пароль',
        property: 'password_re'
      },
    ]
  },
]