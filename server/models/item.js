import mongoose from "mongoose";

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  url: {
    type: String,
    default:
      "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png",
    validate: {
      validator: function (value) {
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return value === "" || regex.test(value);
      },
      message: "Неверный формат URL.",
    },
  },
  type: {
    type: String,
    required: true,
    enum: [ItemTypes.REAL_ESTATE, ItemTypes.AUTO, ItemTypes.SERVICES],
  },
  propertyType: {
    type: String,
    required: function () {
      return this.type === ItemTypes.REAL_ESTATE;
    },
  },
  area: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.REAL_ESTATE;
    },
    min: 1,
  },
  rooms: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.REAL_ESTATE;
    },
    min: 1,
  },
  price: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.REAL_ESTATE;
    },
    min: 1,
  },
  brand: {
    type: String,
    required: function () {
      return this.type === ItemTypes.AUTO;
    },
  },
  model: {
    type: String,
    required: function () {
      return this.type === ItemTypes.AUTO;
    },
  },
  year: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.AUTO;
    },
    min: 1900,
    max: new Date().getFullYear(),
  },
  mileage: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.AUTO;
    },
    min: 0,
  },
  serviceType: {
    type: String,
    required: function () {
      return this.type === ItemTypes.SERVICES;
    },
  },
  experience: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.SERVICES;
    },
    min: 1,
  },
  cost: {
    type: Number,
    required: function () {
      return this.type === ItemTypes.SERVICES;
    },
    min: 0,
  },
  schedule: {
    type: String,
    required: function () {
      return this.type === ItemTypes.SERVICES;
    },
  },
});

export default mongoose.model("Item", itemSchema);
