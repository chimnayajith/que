package com.que.que.service;

import com.que.que.model.QueueUser;
import java.util.PriorityQueue;

public class QueueService {
    private final PriorityQueue<QueueUser> queue;

    public QueueService() {
        // Initialize the PriorityQueue with the custom comparator
        this.queue = new PriorityQueue<>(QueueUser.PRIORITY_COMPARATOR);
    }

    // Method to add a user to the queue
    public void joinQueue(QueueUser user) {
        queue.add(user);
    }

    // Method to get the next user in the queue
    public QueueUser callNext() {
        return queue.poll();
    }

    public PriorityQueue<QueueUser> getAllUsers() {
        return new PriorityQueue<>(queue);
    }
}