import { goerli, optimism } from "wagmi/chains";

export const DEBUG = true;

export const PROJECT_CONFIG = {
  name: 'GPTMiner',
  version: '1.0.0',
  description: 'GPT Miner',
  url: 'https://gptminer.io',
};

export const GPT_CONFIG = {
  url: 'https://chat.openai.com/g/g-WRoKydgki-aime-adam',
};

export const NETWORK_CONFIG = {
  chains: [goerli],
};

export const CONTRACT = {
  Goerli: {
    GPTMiner: '0x93c61fdD7a2D6D4e7e429fddcb1089223A595Ad9',
    GPTMinerInscription: '0xd573152b7852fc324a0FE245D7EE616989900f9D',
  },
  Optimism: {
    GPTMiner: '0xEc9410F65EEfeC104d1C46e35F15837b822B4913'
  },
};

export const API_CONFIG = {
  scheme: "https",
  host: "api.aime.bot",
  grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
};

export const ALCHEMY_CONFIG = {
  Goerli: "tG3loAdZyfqAvKB1uMf88_Z95cXhbWOc",
  Optimism: "Co3hROG5cgCbbMsaIKiGjplscQUvJGhb",
};

export const INFURA_CONFIG = {
  apiKey: "901a77920dae4685978ae537ebb4a069",
};

export const EXPLORER_CONFIG = {
  Optimism: "https://optimistic.etherscan.io",
};

export const DEFAULT_REFERRER = "0x971dF9552669c3890AFE88Cb0a068C98a9A60B7C";
