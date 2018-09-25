import IDGenerator from './id-generator'

const generator = new IDGenerator()

export default function() {
  return generator.generateID()
}
