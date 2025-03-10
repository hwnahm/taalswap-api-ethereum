import gql from "graphql-tag";

export const PAIRS_VOLUME_QUERY = gql`
    query PairsVolume($limit: Int!, $pairIds: [ID!]!, $blockNumber: Int!) {
        pairVolumes: pairs(first: $limit, where: { id_in: $pairIds }, block: { number: $blockNumber }) {
            id
            volumeToken0
            volumeToken1
        }
    }
`;

export const TOKEN_BY_ADDRESS = gql`
    query Token($id: ID!) {
        token(id: $id) {
            id
            name
            symbol
            derivedETH
            derivedUSD
        }
    }
`;

export const GET_TVL = gql`
    query TaalFactory($limit: Int!) {
        taalFactories(first: $limit) {
            totalLiquidityUSD
        }
    }
`;

export const GET_TRX = gql`
    query TaalDayData1($limit: Int!) {
        taalDayDatas(
            first: $limit
            orderBy: date
            orderDirection: desc
        ) {
            totalTransactions
        }
    }
`;

export const GET_VOLUME_USD = gql`
    query TaalDayData2($limit: Int!) {
        taalDayDatas(
            first: $limit
            orderBy: date
            orderDirection: desc
        ) {
            dailyVolumeUSD
        }
    }
`;

export const TOP_PAIRS = gql`
    fragment TokenInfo on Token {
        id
        name
        symbol
        derivedETH
        derivedUSD
    }

    query TopPairs($limit: Int!, $excludeTokenIds: [String!]!) {
        pairs(
            first: $limit
            orderBy: reserveUSD
            orderDirection: desc
            where: { token0_not_in: $excludeTokenIds, token1_not_in: $excludeTokenIds }
        ) {
            id
            token0 {
                ...TokenInfo
            }
            token1 {
                ...TokenInfo
            }
            reserve0
            reserve1
            volumeToken0
            volumeToken1
            reserveETH
            reserveUSD
        }
    }
`;
