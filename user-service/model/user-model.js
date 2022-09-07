import mongoose from 'mongoose';

var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserModelSchema.pre("save", function(next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function(saltError, salt) {
          if (saltError) {
              return next(saltError)
          } else {
              bcrypt.hash(user.password, salt, function(hashError, hash) {
                  if (hashError) {
                      return next(hashError)
                  }

                  user.password = hash
                  console.log(hash)
                  next()
              })
          }
      })
  } else {
      return next()
  }
})

export default mongoose.model('UserModel', UserModelSchema)
