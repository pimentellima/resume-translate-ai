import { relations, sql } from 'drizzle-orm'
import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

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
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    stripeCustomerId: text('stripeCustomerId').unique(),
    stripeSubscriptionId: text('stripeSubscriptionId').unique(),
    createdAt: timestamp('createdAt').defaultNow(),
})

export const accounts = pgTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
)

export const authenticators = pgTable(
    'authenticator',
    {
        credentialID: text('credentialID').notNull().unique(),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        providerAccountId: text('providerAccountId').notNull(),
        credentialPublicKey: text('credentialPublicKey').notNull(),
        counter: integer('counter').notNull(),
        credentialDeviceType: text('credentialDeviceType').notNull(),
        credentialBackedUp: boolean('credentialBackedUp').notNull(),
        transports: text('transports'),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
)

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
    translationsCount: integer('translationsCount').notNull().default(0),
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
