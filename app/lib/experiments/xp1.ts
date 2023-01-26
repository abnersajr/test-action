const experiment = {
  id: "iHUPdK1bRdSSmjjScnO5Q",
  name: "xp1",

  // Turn rotation to `true` when you want to activate the XP for users in prod.
  rotate: false,

  // Learn more about rotate preconditions: https://docs.busbud-int.com/pubweb/Experiments/#rotate-preconditions
  rotate_precondition: {
    product: { $eq: "test" },
    user_country: { $eq: "FD" }
  },

  distribution: {
    "0": "control_1", // 49.5%
    "500": "TESTE", // 49.5%
    "750": "1" // 1%
  },

  // `control` group catches people rejected by XP preconditions.
  // `control_1` and `control_2` are rotating with variants to compare the impact.
  feature_flags: {
    control: {
      CART_V2: false
    },
    control_1: {
      CART_V2: false
    },
    control_2: {
      CART_V2: false
    },
    "1": {
      CART_V2: true
    }
  }
};

export default experiment;