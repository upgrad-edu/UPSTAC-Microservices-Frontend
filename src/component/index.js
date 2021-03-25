import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";

import ls from 'local-storage'

import UINavBar from "./Navbar"
//import UICopyright from "./Copyright"
import {useDispatch, useSelector} from "react-redux"

export {
    ls,
    Box,
    Link,
    Grid,
    React,
    AppBar,
    Button,
    Avatar,
    Toolbar,
    Router,
    FormLabel,
    Switch,
    Route,
    UINavBar,
    Checkbox,
    TextField,
    Container,
    Typography,
    makeStyles,
    CssBaseline,
    FormControlLabel,
    LockOutlinedIcon,
    FormControl,
    RadioGroup,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useState,
    VerifiedUser,
    axios,
    Snackbar,
    MuiAlert,
    useHistory,
    useSelector,
    useDispatch,
    useEffect
}
