import { relations, sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

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
    size: text('size'),
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

export const resumeRelations = relations(resumes, ({ one }) => ({
    user: one(users, { fields: [resumes.userId], references: [users.id] }),
}))
