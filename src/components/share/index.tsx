import React from "react";
import styles from "./style.less";
import { Button, ConfigProvider, Modal, theme } from "antd";
import { THEME_CONFIG } from "@/constants/theme";
import { ReactComponent as TelegramIcon } from "@/assets/brand/telegram.svg";
import { ReactComponent as TwitterIcon } from "@/assets/brand/twitter.svg";
import { FaAngleRight } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const Share: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
}> = ({ visible, setVisible }) => {
  return (
    <Modal
      centered
      title={null}
      footer={null}
      className={styles.shareModal}
      open={visible}
      onCancel={() => setVisible(false)}
    >
      <div className={styles.shareModalContainer}>
        <div className={styles.shareModalHeader}>
          <div className={styles.shareModalHeaderIcon}>
            <img
              className={styles.shareModalHeaderIconImg}
              src={require("@/assets/icon/share.png")}
              alt="icon"
            />
          </div>
          <div className={styles.shareModalHeaderTitle}>
            Share To Increate Minting Speed
          </div>
          <div className={styles.shareModalHeaderDescription}>
            Accelerate +1MP with each shared referral.
          </div>
        </div>
        <div className={styles.shareModalContent}>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
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
              className={styles.shareModalContentItem}
            >
              <div className={styles.shareModalContentItemLeft}>
                <TelegramIcon
                  className={styles.shareModalContentItemIcon}
                />
                <div className={styles.shareModalContentItemText}>
                  Telegram
                </div>
              </div>
              <div className={styles.shareModalContentItemRight}>
                <FaAngleRight
                  className={styles.shareModalContentItemRightIcon}
                />
              </div>
            </Button>
            <Button
              block
              type="primary"
              size="large"
              className={styles.shareModalContentItem}
            >
              <div className={styles.shareModalContentItemLeft}>
                <TwitterIcon
                  className={styles.shareModalContentItemIcon}
                />
                <div className={styles.shareModalContentItemText}>
                  Twitter
                </div>
              </div>
              <div className={styles.shareModalContentItemRight}>
                <FaAngleRight
                  className={styles.shareModalContentItemRightIcon}
                />
              </div>
            </Button>
            <Button
              block
              type="primary"
              size="large"
              className={styles.shareModalContentItem}
            >
              <div className={styles.shareModalContentItemLeft}>
                <IoIosMore
                  className={styles.shareModalContentItemMoreIcon}
                />
                <div className={styles.shareModalContentItemText}>
                  Other Platform
                </div>
              </div>
              <div className={styles.shareModalContentItemRight}>
                <FaAngleRight
                  className={styles.shareModalContentItemRightIcon}
                />
              </div>
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </Modal>
  )
};

export default Share;
