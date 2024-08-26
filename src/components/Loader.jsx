import { Loader } from "lucide-react";
// import tree from '../assets/tree-svgrepo-com.svg'

const LoaderComponent = () => {
  const text = [
    "Lemon trees produce tart, yellow fruits that are used in cooking, beverages, and cleaning products",
    "Oak: Known for its strong wood, oak trees can live for over 200 years.",
    " Maple trees are famous for their sap, which is used to make maple syrup.",
    "Pine trees are evergreen and have needle-like leaves that stay green year-round.",
    "Birch trees have distinctive white bark that peels off in thin layers.",
    "Cedar trees produce aromatic wood often used for making furniture and lining closets.",
    "Redwood trees are some of the tallest and oldest trees in the world, reaching heights of over 300 feet.",
    "Willow trees are known for their long, drooping branches and preference for wet environments.",
    "Cherry trees are celebrated for their beautiful blossoms in the spring and their edible fruits.",
    "Ash trees are commonly used in the production of baseball bats due to their strong, lightweight wood.",
    "Sycamore trees have large, lobed leaves and distinctive mottled bark that peels away in patches.",
    "Baobab trees are native to Africa and are known for their massive trunks, which can store water.",
    "Aspen trees are known for their white bark and the way their leaves flutter in the wind.",
    "Eucalyptus trees are native to Australia and are known for their aromatic leaves and fast growth.",
    "Banyan trees are famous for their aerial roots that grow down from their branches and form new trunks.",
    "Dogwood trees are popular for their showy flowers and vibrant fall foliage.",
    "Magnolia trees are known for their large, fragrant flowers and glossy leaves.",
    "Sequoia trees are among the largest trees by volume, with some over 2,000 years old.",
    "Spruce trees are evergreen conifers with needle-like leaves and are often used as Christmas trees.",
    "Fir trees have upright cones and are also popular choices for Christmas trees.",
    "Elm trees are known for their tall, arching branches and were once a common sight in many cities before Dutch elm disease",
    "Mango trees produce sweet, juicy fruits that are popular in tropical regions.",
    "Fig trees produce soft, sweet fruits that are often dried or eaten fresh.",
    "Pear trees are known for their bell-shaped fruits, which are sweet and juicy.",
    "Plum trees produce small, round fruits that can be sweet or tart, depending on the variety.",
    "Coconut trees produce large fruits with a fibrous husk, containing coconut water and flesh.",
    "Avocado trees produce creamy, green fruits that are rich in healthy fats.",
    "Pomegranate trees produce fruits filled with juicy, edible seeds known as arils.",
    "Walnut trees produce nuts encased in a hard shell, valued for their rich, oily kernels.",
    "Almond trees produce nuts that are eaten raw, roasted, or used to make almond milk.",
    "Apricot trees produce small, orange fruits that are sweet and slightly tart",
    "Papaya trees produce large, tropical fruits with sweet, orange flesh and black seeds.",
    "Banana trees are actually large herbs, and they produce clusters of sweet, elongated fruits.",
    "Grapefruit trees produce large, citrus fruits with a tart, slightly bitter taste.",
    "Olive trees produce small, bitter fruits that are pressed to make olive oil or cured for eating.",
    "Lime trees produce small, green citrus fruits that are used for juice, zest, and garnishes.",
    "Quince trees produce hard, aromatic fruits that are often cooked to make jams and jellies.",
    "Hazelnut trees produce small, round nuts that are commonly used in confections and spreads.",
    "Chestnut trees produce large nuts encased in spiny burs, often roasted and eaten during the winter.",
    "Pistachio trees produce nuts that are typically roasted and salted for a savory snack.",
    "Mulberry trees produce dark, sweet berries that are enjoyed fresh or used in jams and desserts",
    "Persimmon trees produce orange fruits that are sweet and flavorful when fully ripe.",
    "Starfruit trees produce star-shaped fruits that are sweet-tart and often used as garnishes.",
    "Jackfruit trees produce large, tropical fruits with sweet, fibrous flesh often used in vegan dishes.",
    " Guava trees produce fragrant fruits that are sweet and often used in juices and desserts.",
    "Tamarind trees produce pod-like fruits containing tangy pulp used in cooking and sauces.",
    "Lychee trees produce small, round fruits with a sweet, floral flavor and a rough outer shell.",
    "Breadfruit trees produce large, starchy fruits that are cooked and eaten as a staple food in tropical regions",
    "Date palm trees produce sweet, sticky fruits called dates, which are commonly dried and eaten as a snack.",
    "Carob trees produce pods that are ground into a sweet powder, often used as a chocolate substitute.",
    "Nectarine trees produce smooth-skinned fruits similar to peaches, with sweet and juicy flesh.",
  ]

  return (
    <div className="w-full h-dvh sm:h-screen flex flex-col justify-center items-center">
      <Loader size={30} className="animate-spin " /><br />
      {/* <img src={tree} height={40} width={40} /> */}
      <p className="text-lg w-2/3 text-center text-gray-500  mt-4">{text[Math.floor(Math.random() * text.length)]}</p>
    </div>
  );
};

export default LoaderComponent;
