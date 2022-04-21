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
  name: 'auth.registration.steps.one.name',
  small_text: 'auth.registration.steps.one.small_text',
  title: "auth.registration.steps.one.title",
  label: "auth.registration.steps.one.label",
  icon: "assets/icons/person.svg",
  config: [
    {
      type: 'input',
      placeholder: 'auth.registration.steps.one.config.name_p',
      key: 'name',
      error: 'auth.registration.steps.one.config.name_p_err'
    },
    {
      type: 'input',
      placeholder: 'auth.registration.steps.one.config.surname_p',
      key: 'surname',
      error: 'auth.registration.steps.one.config.surname_p_err'
    },
    {
      helper: 'auth.registration.steps.one.config.birth_date_p_helper',
      type: 'birth-date',
      placeholder: 'auth.registration.steps.one.config.birth_date_p',
      key: 'birth_date',
      error: 'auth.registration.steps.one.config.birth_date_p_err'
    }
  ]
}

export const SignUpPageTwo: StageModel = {
  name: 'auth.registration.steps.two.name',
  small_text: 'auth.registration.steps.two.small_text',
  title: "auth.registration.steps.two.title",
  label: "auth.registration.steps.two.label",
  icon: "assets/icons/about-page.svg",
  config: [
    {
      type: 'city-selector',
      placeholder: 'auth.registration.steps.two.config.city_p',
      key: 'city',
      error: 'auth.registration.steps.two.config.city_p_err'
    },
    {
      type: 'user-type',
      placeholder: 'auth.registration.steps.two.config.user_type_p',
      key: 'user_type',
      error: 'auth.registration.steps.two.config.user_type_p_err'
    },
  ]
}

export const SignUpPageThree: StageModel = {
  name: 'auth.registration.steps.three.name',
  small_text: 'auth.registration.steps.three.small_text',
  title: "auth.registration.steps.three.title",
  label: "auth.registration.steps.three.label",
  icon: "assets/icons/star.svg",
  config: [
    {
      type: 'goals',
      key: 'goals',
      userTypes: [
        {
          name: 'auth.registration.steps.three.config.name_1',
          icon: 'assets/images/nerd-face.png',
          description: 'auth.registration.steps.three.config.desc_1'
        },
        {
          name: 'auth.registration.steps.three.config.name_2',
          icon: 'assets/images/idea.png',
          description: 'auth.registration.steps.three.config.desc_2'
        },
        {
          name: 'auth.registration.steps.three.config.name_3',
          icon: 'assets/images/wow-face.png',
          description: 'auth.registration.steps.three.config.desc_3'
        }
      ]
    }
  ]
}

export const SignUpPageFour: StageModel = {
  name: 'auth.registration.steps.four.name',
  small_text: 'auth.registration.steps.four.small_text',
  title: "auth.registration.steps.four.title",
  label: "auth.registration.steps.four.label",
  icon: "assets/icons/message.svg",
  config: [
    {
      type: 'email',
      placeholder: 'auth.registration.steps.four.config.email_p',
      key: 'email',
      error: 'auth.registration.steps.four.config.email_p_err'
    },
    {
      type: 'password',
      placeholder: 'auth.registration.steps.four.config.password_p',
      key: 'password',
      error: 'auth.registration.steps.four.config.password_p_err'
    },
    {
      type: 'password',
      placeholder: 'auth.registration.steps.four.config.re_password_p',
      key: 're_password',
      error: 'auth.registration.steps.four.config.re_password_p_err'
    },
  ]
} 