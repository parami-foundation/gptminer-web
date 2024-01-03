import React, { useEffect } from "react";
import styles from "../style.less";
import { useSwitchNetwork } from "wagmi";
import { ReactComponent as RefreshIcon } from '@/assets/icon/refresh.svg';
import { FaAngleRight } from "react-icons/fa";
import { Button, ConfigProvider, notification, theme } from "antd";
import { THEME_CONFIG } from "@/constants/theme";

const SwitchNetwork: React.FC = () => {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  useEffect(() => {
    if (!!error) {
      notification.error({
        key: "switchNetworkError",
        message: "Switch Network Error",
        description: error?.message,
      });
    }
  }, [error]);

  return (
    <>
      <div className={styles.loginModalHeader}>
        <div className={styles.loginModalHeaderIcon}>
          <img
            className={styles.loginModalHeaderIconImg}
            src={require("@/assets/icon/wallet.png")}
            alt="icon"
          />
        </div>
        <div className={styles.loginModalHeaderTitle}>
          Change Network
        </div>
        <div className={styles.loginModalHeaderDescription}>
          Please change your network to {chains[0]?.name}
        </div>
      </div>
      <div className={styles.loginModalContent}>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              wireframe: false,
              colorPrimary: THEME_CONFIG.colorGray,
              borderRadius: THEME_CONFIG.borderRadius,
              boxShadow: THEME_CONFIG.boxShadow,
            },
          }}
        >
          <Button
            block
            type="primary"
            size="large"
            loading={isLoading && pendingChainId === chains[0]?.id}
            className={styles.loginModalContentItem}
            onClick={() => {
              switchNetwork?.(chains[0]?.id);
            }}
          >
            <div className={styles.loginModalContentItemLeft}>
              <RefreshIcon
                className={styles.loginModalContentItemIcon}
              />
              <div className={styles.loginModalContentItemText}>
                Switch Network
              </div>
            </div>
            <div className={styles.loginModalContentItemRight}>
              <FaAngleRight
                className={styles.loginModalContentItemRightIcon}
              />
            </div>
          </Button>
        </ConfigProvider>
      </div>
    </>
  )
};

export default SwitchNetwork;
