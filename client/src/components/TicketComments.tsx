import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Comment } from '../../types/types';

interface TicketCommentsProps {
  ticketId: number;
  newComment: Comment | null;
}

const TicketComments: React.FC<TicketCommentsProps> = ({
  ticketId,
  newComment,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  }, [newComment]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/admin/allComments/${ticketId}`
          // `/admin/allComments/${ticketId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();

        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [ticketId]);

  return (
    <Box>
      <Typography variant="h6" textAlign="center">
        Comments
      </Typography>
      <List>
        {comments &&
          comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${comment.comment}`}
                secondary={`Date: ${new Date(
                  comment.timestamp
                ).toLocaleString()} | ${comment.username}`}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default TicketComments;
