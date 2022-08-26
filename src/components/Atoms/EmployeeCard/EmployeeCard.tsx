import * as React from "react";

import { IEmployeeCard } from "./EmployeeCard.interface";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";
import { GENDERS } from "@/constants/Genders";
import styles from "./EmployeeCard.module.css";
import { DeleteForever, DeleteOutline, Edit } from "@mui/icons-material";
const EmployeeCard = ({ employee, onDeleteClicked }: IEmployeeCard) => {
  return (
    <Card className={styles.card} elevation={4}>
      {employee.photo ? (
        <CardMedia
          component="img"
          height="180"
          image={String(employee.photo)}
          alt={employee.firstName}
        />
      ) : (
        //  <Image
        //     src={String(employee.photo)}
        //     alt="Profile Picture"
        //     layout="fill"
        //   />
        <div className={styles.textAvatar}>
          <Typography
            gutterBottom
            variant="h1"
            component="div"
            fontWeight="bold"
            textAlign="center"
            className={styles.textAvatarText}
          >
            {`${employee.firstName.charAt(0).toUpperCase()}${employee.lastName
              .charAt(0)
              .toUpperCase()}`}
          </Typography>
        </div>
      )}

      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          fontWeight="bold"
        >
          {`${employee.firstName} ${employee.lastName}`}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          fontWeight="bold"
        >
          {employee.email}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          fontWeight="bold"
        >
          {employee.number}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          fontWeight="bold"
        >
          {employee.gender == GENDERS.MALE
            ? "Male"
            : employee.gender == GENDERS.FEMALE
            ? "Female"
            : ""}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Fab
          size="small"
          color="error"
          onClick={() => onDeleteClicked(String(employee.id))}
        >
          <Delete />
        </Fab>
        <Link href={`/employee/edit/${employee.id}`}>
          <Fab size="small" color="success">
            <Edit />
          </Fab>
        </Link>
      </CardActions>
    </Card>
  );
};

export { EmployeeCard };
