export default function getCategoryIcon(val: string){
  switch (val) {
    case "❤️":
      return 'assets/images/heart.png'
    case "🧿":
      return 'assets/images/nazar-amulet.png'
    case "💸":
      return 'assets/images/finance.png'
    case "🙏":
      return 'assets/images/folded-hands.png'
    case "🌱":
      return 'assets/images/seedling.png'
    default:
      return 'assets/images/seedling.png'
  }
}