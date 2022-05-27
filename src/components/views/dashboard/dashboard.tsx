import React from "react";
import styles from "./dashboard.module.scss";
import { Layout } from "../layout/layout";
import { dataDB } from "../../../constant/data";
import CardTotal from "../../ui/card/cardTotal";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <Layout>
      <div className={styles["root"]}>
        <div className={styles["summary"]}>
          {React.Children.toArray(
            dataDB.map((card) => {
              return (
                <CardTotal
                  title={card.title}
                  total={card.total}
                  icon={card.icon}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
