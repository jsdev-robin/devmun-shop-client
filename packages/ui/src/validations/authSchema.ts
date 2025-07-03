import { z } from 'zod';

export const schemas = {
  auth: {
    signin: z.object({
      email: z.string().email({ message: 'Please enter a valid email address' }),
      password: z.string().min(1, { message: 'Password is required' }),
      remember: z.boolean().optional(),
    }),

    signup: z
      .object({
        firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }).max(32, { message: 'First name cannot exceed 32 characters' }),
        lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }).max(32, { message: 'Last name cannot exceed 32 characters' }),
        email: z.string().email({ message: 'Please enter a valid email address' }),
        password: z
          .string()
          .min(8, { message: 'Password must be at least 8 characters' })
          .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
            message: 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
          }),
        passwordConfirm: z.string(),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
      }),

    verification: z.object({
      otp: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
      }),
    }),

    passwordChange: z
      .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
          .string()
          .min(1, 'Password is required')
          .min(8, 'Password must be at least 8 characters long')
          .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            'Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.',
          ),
        confirmNewPassword: z.string(),
      })
      .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
      }),

    updateEmail: z
      .object({
        newEmail: z.string().min(1, 'New email is required').email('Enter a valid email address'),
        confirmEmail: z.string().min(1, 'Confirm new email is required').email('Enter a valid email address'),
        password: z.string().min(1, 'MUN password is required'),
      })
      .refine((data) => data.newEmail === data.confirmEmail, {
        path: ['confirmEmail'],
        message: 'Emails do not match',
      }),
  },

  settings: {
    location: z.object({
      region: z.string().nonempty('Region is required'),
      language: z.string().nonempty('Language is required'),
      currency: z.string().nonempty('Currency is required'),
    }),

    communication: z.object({
      postalMail: z.boolean(),
      phoneCalls: z.boolean(),
    }),

    notifications: z.object({
      send_message: z.boolean().optional(),
      receive_reply: z.boolean().optional(),
      new_follower: z.boolean().optional(),
      listing_expiration: z.boolean().optional(),
    }),

    subscriptions: z.object({
      new_notable: z.boolean().optional(),
      feedback: z.boolean().optional(),
      coupons_promotions: z.boolean().optional(),
      forums: z.boolean().optional(),
      advocacy: z.boolean().optional(),
      seller_activity: z.boolean().optional(),
      news_features: z.boolean().optional(),
      shop_tips: z.boolean().optional(),
      pattern_news: z.boolean().optional(),
      premium_news: z.boolean().optional(),
    }),
  },

  feedback: z.object({
    reason: z.string().min(1, 'Please select a reason'),
    subreason: z.string().optional(),
    description: z.string().optional(),
    contractEmail: z.boolean().optional(),
  }),

  address: z.object({
    country: z.string().min(1, 'Country is required'),
    fullName: z.string().min(1, 'Full name is required'),
    street: z.string().min(1, 'Street address is required'),
    flat: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    postCode: z.string().optional(),
    isDefault: z.boolean().optional(),
  }),

  profile: z.object({
    img: z
      .custom<File>()
      .refine((file) => file instanceof File, 'File is required')
      .refine((file) => file.type.startsWith('image/'), 'Only image files are allowed (jpg, png, etc.)')
      .optional(),
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }).max(32, { message: 'First name cannot exceed 32 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }).max(32, { message: 'Last name cannot exceed 32 characters' }),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
    city: z.string().min(1, 'City is required').max(50, 'City name too long'),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine(
        (dateString) => {
          const date = new Date(dateString);
          return !isNaN(date.getTime());
        },
        { message: 'Invalid date' },
      )
      .refine((dateString) => new Date(dateString) <= new Date(), 'Birthday cannot be in the future'),
    about: z.string().max(500, 'About section too long'),
    favoriteMaterials: z.array(z.string()).max(13, 'You can share up to 13 materials').optional(),

    includeOnProfile: z.boolean().default(true).optional(),
    include: z
      .object({
        includeShop: z.boolean().optional(),
        favoriteItems: z.boolean().optional(),
        favoriteShops: z.boolean().optional(),
      })
      .optional(),
  }),
};
