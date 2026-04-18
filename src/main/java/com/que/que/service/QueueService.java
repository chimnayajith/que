package com.que.que.service;

import com.que.que.model.QueueUser;
import com.que.que.enums.QueueStatus;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class QueueService {
    private final PriorityQueue<QueueUser> queue;
    private final HashMap<Integer, QueueUser> userMap;

    private final AtomicInteger tokenCounter = new AtomicInteger(1);
    public QueueService() {
        // Initialize the PriorityQueue with the custom comparator
        this.queue = new PriorityQueue<>(QueueUser.PRIORITY_COMPARATOR);
        this.userMap = new HashMap<>();
    }

    private int generateToken(){
        int candidate;

        do{
            candidate = tokenCounter.getAndUpdate(n -> n == Integer.MAX_VALUE ? 1 : n+1);
        } while (userMap.containsKey(candidate));
        return candidate;
    }

    // Method to add a user to the queue
    public QueueUser joinQueue(String name, int priority) {
        int token = generateToken();
        QueueUser user = new QueueUser(token, name, priority, QueueStatus.WAITING);
        queue.add(user);
        userMap.put(token, user);
        return user;
    }

    // Get a user by ID/token
    public QueueUser getUserById(int token) {
        return userMap.get(token);
    }
    
    // Method to get the next user in the queue
    public void skipUser(int token) {
        QueueUser user = userMap.remove(token);
        if (user != null) {
            user.setStatus(QueueStatus.SKIPPED);
            queue.remove(user);
        }
    }

    // Retrieve and remove the next user from the queue
    public QueueUser callNext() {
        QueueUser next = queue.poll();
        if (next != null) {
            next.setStatus(QueueStatus.SERVING);
            userMap.remove(next.getTokenNumber());
        }
        return next;
    }

    public QueueUser completeService(int token) {
        QueueUser user = userMap.remove(token);
        if (user != null) {
            user.setStatus(QueueStatus.COMPLETED);
        }
        return user;
    }

    // get position of the user in queue
    public int getPosition(int token) {
        if (!userMap.containsKey(token)) {
            return -1;
        }
        List<QueueUser> users = new ArrayList<>(queue);
        users.sort(QueueUser.PRIORITY_COMPARATOR);
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getTokenNumber() == token) {
                return i + 1;
            }
        }
        // if serving or completed, position is 0 or -1 depending on desired contract
        QueueUser u = userMap.get(token);
        if (u != null && u.getStatus() == QueueStatus.SERVING) {
            return 0; // 0 indicates currently being served
        }
        return -1;
    }

    public List<QueueUser> getAllUsers() {
        List<QueueUser> users = new ArrayList<>(queue);
        users.sort(QueueUser.PRIORITY_COMPARATOR);
        return Collections.unmodifiableList(users);
    }
}