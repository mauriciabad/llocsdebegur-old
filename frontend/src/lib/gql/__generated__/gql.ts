/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getAllPlacesOfType($locale: I18NLocaleCode!, $type: String!) {\n    places(\n      locale: $locale\n      filters: { type: { eq: $type } }\n      pagination: { limit: 1000 }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetAllPlacesOfTypeDocument,
    "\n  query getBeach($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"beach\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalBeachGlobal {\n              waterEntry\n              sandType\n              orientation\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetBeachDocument,
    "\n  query getLandmark($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"landmark\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalLandmarkGlobal {\n              isVisitable\n              year\n              referencePrice\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetLandmarkDocument,
    "\n  query getLanding($locale: I18NLocaleCode!) {\n    landing(locale: $locale) {\n      data {\n        attributes {\n          heroTitle\n          heroDescription\n        }\n      }\n    }\n  }\n": types.GetLandingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllPlacesOfType($locale: I18NLocaleCode!, $type: String!) {\n    places(\n      locale: $locale\n      filters: { type: { eq: $type } }\n      pagination: { limit: 1000 }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllPlacesOfType($locale: I18NLocaleCode!, $type: String!) {\n    places(\n      locale: $locale\n      filters: { type: { eq: $type } }\n      pagination: { limit: 1000 }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBeach($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"beach\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalBeachGlobal {\n              waterEntry\n              sandType\n              orientation\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBeach($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"beach\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalBeachGlobal {\n              waterEntry\n              sandType\n              orientation\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLandmark($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"landmark\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalLandmarkGlobal {\n              isVisitable\n              year\n              referencePrice\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLandmark($locale: I18NLocaleCode!, $slug: String!) {\n    places(\n      locale: $locale\n      filters: { and: [{ type: { eq: \"landmark\" }, slug: { eq: $slug } }] }\n    ) {\n      data {\n        attributes {\n          name\n          slug\n          description\n          content\n          type\n          latitude\n          longitude\n          googleMapsPlaceId\n          cover {\n            data {\n              attributes {\n                url\n                height\n                width\n                alternativeText\n              }\n            }\n          }\n          detailsGlobal {\n            ... on ComponentPlaceDetailsGlobalLandmarkGlobal {\n              isVisitable\n              year\n              referencePrice\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLanding($locale: I18NLocaleCode!) {\n    landing(locale: $locale) {\n      data {\n        attributes {\n          heroTitle\n          heroDescription\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLanding($locale: I18NLocaleCode!) {\n    landing(locale: $locale) {\n      data {\n        attributes {\n          heroTitle\n          heroDescription\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;