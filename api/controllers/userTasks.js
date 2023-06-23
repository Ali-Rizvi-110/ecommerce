const User = require('../models/userSchema.js') // To create user we are using a Schema
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")

dotenv.config();

const createUser = async (req, res) => {
    try {
      const { email, password, contact, firstName, lastName, address } = req.body;
      const person = await User.findOne({email});
      if(person!=null)return res.status(409).json('user email already exists');
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        contact,
        firstName,
        lastName,
        address,
      });
  
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in createUser function', error });
    }
  };
  
  
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json({users})
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Error in ShowAllUsers", err})
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ msg: `No user with id ${id}` });
        }
        return res.status(200).json({ msg: `The user ${user.name} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error in deleting the user', error });
    }
};

const getUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: `User with id ${id} not found` });
      }
      res.status(200).json({ email: user.email, firstName: user.firstName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: 'Error in retrieving the user', error });
    }
};
  
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }); // Use the `findOne` method instead of `find` to retrieve a single user
        // console.log(email)
      if (!user) {
        // User with the provided email doesn't exist
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Check if the provided password matches the stored password using a password comparison method like bcrypt
  
      // Assuming you have a `comparePassword` method to compare passwords using bcrypt
      const passwordMatch = await comparePassword(password, user.password);
  
      if (!passwordMatch) {
        // Password doesn't match
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Password matches, generate and return the JWT access token
      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
  
      res.json({ accessToken});
    } catch (error) {
      console.log(error);
      res.status(500).json({ err: 'Error in Login function', error });
    }
  };

  const addToWishlist = async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log(req.user)
      const productId = req.body.productId;
      console.log(userId, productId);
      const user = await User.findOne(
        { _id: userId }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // console.log(user.wishlist);
      let find = false;
      user.wishlist.forEach(element => {
        // console.log(element)
        if(element.productId==productId){
          // console.log("mil gya")
          find = true;
        }
      });
      if(find){
        // console.log("bahar gye")
        return res.status(409).json({error: "Product already exists"})
      }
      const update = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { wishlist: { productId: productId } } },
        { new: true }
      );
      
      console.log("done")
      res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in addToWishlist function', error });
    }
  };
  
  const getWishlist = async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have middleware to authenticate the user and attach user information to the request object
  
      // Find the user by their ID and populate the wishlist field with product data
      const user = await User.findById(userId).populate('wishlist.productId');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const wishlist = user.wishlist.map((item) => item.productId);
      // console.log(wishlist)
      res.status(200).json(wishlist);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in getWishlist function', error });
    }
  };

  const removeFromWishlist = async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log(req.params);
      const productId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const wishlistItemIndex = user.wishlist.findIndex((item) => item.productId == productId);
      if (wishlistItemIndex === -1) {
        return res.status(404).json({ error: 'Product not found in the wishlist' });
      }
  
      user.wishlist.splice(wishlistItemIndex, 1);
      await user.save();
  
      res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in removeFromWishlist function', error });
    }
  };
  const addToCart = async (req, res) => {
    try {
      const userId = req.user.userId;
      const productId = req.body.productId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const cartItem = user.cart.find((item) => item.productId == productId);
      if (cartItem) {
        return res.status(409).json({ error: 'Product already exists in the cart' });
      }
  
      user.cart.push({ productId, count: 1 });
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in addToCart function', error });
    }
  };

  const increaseCartItem = async (req, res) => {
    console.log("hello", req.params)
    try {
      const userId = req.user.userId; // because of authentication
      const productId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      cartItem.count++;
      await user.save();
  
      res.status(200).json({ message: 'Cart item count increased' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in increaseCartItem function', error });
    }
  };
  
  const decreaseCartItem = async (req, res) => {
    try {
      const userId = req.user.userId;
      const productId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      if (cartItem.count > 1) {
        cartItem.count--;
        await user.save();
      } else {
        // If the count becomes 0, remove the item from the cart
        user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
        await user.save();
        console.log("deleted")
        return res.status(200).json({ message: 'Cart item removed' });
      }
      res.status(200).json({ message: 'Cart item count decreased' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in decreaseCartItem function', error });
    }
  };
  
  const getCart = async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have middleware to authenticate the user and attach user information to the request object
  
      const user = await User.findById(userId).populate('cart.productId');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const cartItems = user.cart.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        name: item.productId ? item.productId.name : null,
        imageUrl: item.productId ? item.productId.imageUrl : null,
        company: item.productId ? item.productId.company : null,
        description: item.productId ? item.productId.description : null,
        seller: item.productId ? item.productId.seller : null,
        price: item.productId ? item.productId.price : null,
        count: item.count
      }));
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in getCart function', error });
    }
  };
  
  // module.exports = { addToCart, increaseCartItem, decreaseCartItem, getCart };
  
  
  
  module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    getUser,
    loginUser,
    addToWishlist,
    addToCart,
    getWishlist,
    removeFromWishlist,
    addToCart, 
    increaseCartItem, 
    decreaseCartItem,
    getCart
  };