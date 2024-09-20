import { stripe } from '@/lib/stripe'
import { relations, sql } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const languageEnum = pgEnum('languages', [
    'enUS',
    'enGB',
    'esES',
    'esMX',
    'frFR',
    'deDE',
    'itIT',
    'ptPT',
    'ptBR',
    'ruRU',
    'jaJP',
    'koKR',
    'zhCN',
    'zhTW',
    'arSA',
    'hiIN',
    'nlNL',
    'svSE',
    'fiFI',
    'noNO',
])
export const layoutEnum = pgEnum('layouts', ['metro', 'simple'])

export const users = pgTable('users', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    email: text('email'),
    stripeCustomerId: text('stripeCustomerId').unique(),
    stripeSubscriptionId: text('stripeSubscriptionId').unique(),
    stripeProductId: text('stripeProductId'),
    subscriptionStatus: text('subscriptionStatus'),
    createdAt: timestamp('createdAt').defaultNow(),
})

export const generations = pgTable('generations', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    userId: text('userId')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    resumeId: text('resumeId').references(() => resumes.id, {
        onDelete: 'set null',
    }),
    date: timestamp('date').defaultNow(),
})

export const resumes = pgTable('resumes', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
    key: text('key').notNull(),
    layout: layoutEnum('layout').notNull().default('metro'),
    name: text('name').notNull().default(''),
    resumeJson: text('resumeJson').notNull().default(''),
    language: languageEnum('language'),
    fileSize: integer('fileSize').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    expiresAt: timestamp('expiresAt'),
})

export const refreshTokens = pgTable('refreshTokens', {
    token: text('token')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    userId: text('userId')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
    resumes: many(resumes),
}))

export const resumesRelations = relations(resumes, ({ one }) => ({
    user: one(users, { fields: [resumes.userId], references: [users.id] }),
}))
