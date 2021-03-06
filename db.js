const Sequelize = require('sequelize')
const { UUID, UUIDV4 } = Sequelize
const chalk = require('chalk')

const db = new Sequelize('postgres://localhost:5432/acme_product_offerings')

const uuidDefinition = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}
const Products = db.define('product', {
  id: uuidDefinition,
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  suggestedPrice: {
    type: Sequelize.DECIMAL
  }
})

const Companies = db.define('company', {
  id: uuidDefinition,
  name: {
    type: Sequelize.STRING,
    unique: true
  }
})


const Offerings = db.define('offering', {
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 1.0
  }
})



Products.belongsToMany(Companies, {through: 'offering'})
Companies.belongsToMany(Products, {through: 'offering'})



const seed = async() => {
  const bar = await Products.create({
    name: 'bar',
    suggestedPrice: 5
  })

  const bazz = await Products.create({
    name: 'bazz',
    suggestedPrice: 9
  })

  const foo = await Products.create({
    name: 'foo',
    suggestedPrice: 3
  })

  const quq = await Products.create({
    name: 'quq',
    suggestedPrice: 3
  })

  const acmeUs = await Companies.create({
    name: 'ACME US',
  })

  const acmeGlobal = await Companies.create({
    name: 'ACME GLOBAL',
  })

  const acmeTri = await Companies.create({
    name: 'ACME TRI-STATE',
  })

  const offering1 = await Offerings.create({
    price: 2.9,
    companyId: acmeUs.id,
    productId: quq.id
  })

  const offering2 = await Offerings.create({
    price: 2.8,
    companyId: acmeGlobal.id,
    productId: bazz.id
  })

  const offering3 = await Offerings.create({
    price: 4.5,
    companyId: acmeTri.id,
    productId: bar.id
  })

  const offering4 = await Offerings.create({
    price: 11,
    companyId: acmeUs.id,
    productId: foo.id
  })
}


const syncAndSeed = () => {
  return db.sync({ force: true })
  .then(() => seed())
  .catch(e => {
    console.log(chalk.red('Problem sycning and seeding'))
    console.error(e)
  })
}


module.exports = {
  syncAndSeed,
  Products,
  Companies,
  Offerings
}

