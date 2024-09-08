import { languages } from '@/constants'
import { relations, sql } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const languageEnum = pgEnum('languages', languages)
export const formatEnum = pgEnum('formats', ['html', 'pdf'])

export const users = pgTable('users', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    email: text('email'),
    password: text('password'),
    googleId: text('googleId'),
    linkedinId: text('linkedinId'),
    createdAt: timestamp('createdAt').defaultNow(),
})

export const translations = pgTable('translations', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    userId: text('userId')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    key: text('key'),
    name: text('name'),
    language: languageEnum('language').notNull(),
    fileSize: integer('fileSize').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
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
    translations: many(translations)
}))

export const translationRelations = relations(translations, ({ one }) => ({
    user: one(users, { fields: [translations.userId], references: [users.id] }),
}))
