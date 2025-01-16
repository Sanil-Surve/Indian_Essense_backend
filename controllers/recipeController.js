const openai = require("../config/openaiConfig");

const suggestRecipes = async (req, res) => {
  const { ingredients, preferences, language } = req.body;

  const recipesArray = [
    {
      name: "Chicken Curry",
      ingredients: [
        "chicken",
        "onions",
        "tomatoes",
        "ginger",
        "garlic",
        "cumin",
        "turmeric",
        "chili powder",
        "garam masala",
      ],
    },
    {
      name: "Vegetable Biryani",
      ingredients: [
        "basmati rice",
        "carrots",
        "peas",
        "potatoes",
        "onions",
        "cinnamon",
        "cardamom",
        "cloves",
        "mint",
        "yogurt",
      ],
    },
    {
      name: "Dal Tadka",
      ingredients: [
        "toor dal",
        "onion",
        "tomato",
        "garlic",
        "cumin",
        "mustard seeds",
        "turmeric",
        "chili powder",
        "ghee",
      ],
    },
    {
      name: "Paneer Butter Masala",
      ingredients: [
        "paneer",
        "butter",
        "onion",
        "tomatoes",
        "cream",
        "cumin",
        "garam masala",
        "kasuri methi",
      ],
    },
    {
      name: "Aloo Gobi",
      ingredients: [
        "potatoes",
        "cauliflower",
        "ginger",
        "garlic",
        "turmeric",
        "coriander powder",
        "garam masala",
      ],
    },
    {
      name: "Samosa",
      ingredients: [
        "potatoes",
        "peas",
        "cumin",
        "coriander",
        "ginger",
        "green chilies",
        "wheat flour",
      ],
    },
    {
      name: "Chana Masala",
      ingredients: [
        "chickpeas",
        "onions",
        "tomatoes",
        "garlic",
        "ginger",
        "cumin",
        "turmeric",
        "coriander powder",
        "garam masala",
      ],
    },
    {
      name: "Palak Paneer",
      ingredients: [
        "paneer",
        "spinach",
        "garlic",
        "ginger",
        "cream",
        "cumin",
        "garam masala",
      ],
    },
    {
      name: "Bhindi Masala",
      ingredients: [
        "okra",
        "onions",
        "tomatoes",
        "ginger",
        "garlic",
        "turmeric",
        "coriander powder",
        "garam masala",
      ],
    },
    {
      name: "Butter Chicken",
      ingredients: [
        "chicken",
        "butter",
        "onion",
        "tomatoes",
        "cream",
        "kasuri methi",
        "garam masala",
      ],
    },
  ];

  const messages = [
    { role: "system", content: "You are an Indian cuisine expert." },
    {
      role: "user",
      content: `
        Suggest Indian recipes in ${language} language based on:
        Ingredients: ${ingredients.join(", ")}
        Preferences: ${preferences}
        Reference: ${recipesArray
          .map((r) => `${r.name} (${r.ingredients.join(", ")})`)
          .join("; ")}
      `,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Debug the response
    // console.log("OpenAI API raw response:", response);

    // Ensure response has the expected structure
    if (response && response.choices && response.choices.length > 0) {
      const suggestions = response.choices[0].message.content.trim();
      res.json({ suggestions });
    } else {
      console.error("Invalid response structure:", response);
      res.status(500).json({ error: "Invalid response from OpenAI API" });
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error.message || error);
    res.status(500).json({ error: "Failed to generate recipes" });
  }
};

module.exports = { suggestRecipes };
