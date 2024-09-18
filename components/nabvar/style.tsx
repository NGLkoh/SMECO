'use client'
import { Image } from '@chakra-ui/react'
import styled from 'styled-components';

export const LogoComponent = styled(Image).attrs<any>(() => ({}))`
    width: 100%;
    border: 3px solid black;
    padding: 2px;
    margin-top: auto;
    margin-right: auto;
` as typeof Image;