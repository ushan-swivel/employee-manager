import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h3" marginTop={10} textAlign="center">
        Practical Assignment
      </Typography>
      <Typography variant="h4" marginTop={2} textAlign="center">
        Employee Management
      </Typography>
    </div>
  );
};

export default Home;
