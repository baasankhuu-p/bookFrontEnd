import { useState, useEffect } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../../Constants'

export const GetComment = bookID => {
  return axios.get(`${RestApiUrl}/api/comment/${bookID}`)
}

export const WriteComment = (bookID, newrate, newcomment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  return axios.post(`${RestApiUrl}/api/comment/${bookID}`, {
    "comments": newcomment,
    "rating": newrate
  }, config)
};
