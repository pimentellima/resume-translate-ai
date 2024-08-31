import { languages } from '@/constants'
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

export const resumes = pgTable('resumes', {
    id: text('id')
        .notNull()
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    userId: text('userId')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    name: text('name'),
    key: text('key'),
    fileSize: integer('fileSize').notNull(),
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
    resumeId: text('resumeId')
        .references(() => resumes.id)
        .notNull(),
    key: text('key'),
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
    resumes: many(resumes),
}))

export const resumeRelations = relations(resumes, ({ one, many }) => ({
    user: one(users, { fields: [resumes.userId], references: [users.id] }),
    translations: many(translations),
}))

export const translationRelations = relations(translations, ({ one }) => ({
    user: one(users, { fields: [translations.userId], references: [users.id] }),
    resume: one(resumes, {
        fields: [translations.resumeId],
        references: [resumes.id],
    }),
}))
